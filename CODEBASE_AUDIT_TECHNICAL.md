# Codebase Audit — data_acquisition

**Date:** 2026-09-01
**Scope:** full repository (`~/apps/data_acquisition`, branch `STAGING_docker`; verified byte-identical to the release copy at `/opt/apps/data_acquisition` except `.env` and two docs)
**Method:** five parallel deep-dive investigations (HHM pipeline, MMB/althea/philips_mri, Redis/tunnel/VPN, DB layer, infra/ops/config), with every CRITICAL/HIGH finding independently re-verified against source. Findings already tracked in `BACKLOG.md` (host-key drift §1/§4a, credential re-encrypt §2, winston retirement, crontab consolidation §6f, dead `RUN_ENV` switches §6f) are **not** re-reported as new.

**Owner constraint honored throughout:** the `ip_reset` run group intentionally no longer performs real VPN tunnel resets, but the process must stay intact — it still drains the Redis queues and inserts into the database, and real resets may return. Nothing below treats the disabled reset as a defect; a dedicated section assesses re-enablement readiness.

---

## Executive Summary

**Overall health: fair-to-good core, with a hazardous periphery.** The parts of this app touched by the 2026-08 migration and hardening work are genuinely well engineered: the run-once dispatch and `run_outcome/v1` exit-code contract in `index.js`, the release pipeline (`build-release.sh` + preflight + provenance stamping), the `_configs.js`/`_shared.js` HHM registry, the curated `connection_regex.js` error taxonomy, and the structured self-logging into `util.app_run_logs` are all careful, documented, and correct. `CLAUDE.md` is accurate on every claim tested.

**The most important risks are:**

1. **A committed plaintext device credential and plaintext-equivalent legacy ciphertexts** in `util/encrypt/` (SEC-001, CRITICAL) — on a personal GitHub remote, with the decryption key hardcoded in the same file.
2. **Decrypted HHM passwords leak into logs and the database whenever an acquisition script fails abnormally** (SEC-002, HIGH) — the redaction helper covers log *notes*, but Node's `execFile` error message carries the full command line (IP, user, password) into cron `.out` files, `util.app_run_logs`, and even `alert.offline_hhm_conn.connection_error`.
3. **Destructive-read-before-write on every Redis queue drain** (BUG-001/002, HIGH) — all three consumers (`offline_alert`, `system_reset_totalizer`, `ip_reset`) delete the queue before (or regardless of) the Postgres writes succeeding, so a mid-run failure permanently loses that cycle's data; the `LRANGE`+`DEL` pattern also destroys concurrent producer pushes.
4. **Two "hang forever" failure modes** — `db/pgPool.js` lacks the fleet connection timeout (DB-001) and the Redis client has no bounded connect (BUG-005); either one hangs a run indefinitely, holds the flock, and silently suppresses all subsequent cron cycles with *no* run record (monitoring reads "never ran").
5. **The Philips-MRI second-chance retry is structurally broken** (BUG-003, HIGH) — independently confirmed by two investigations: `tunnel_reset` dispatches those systems to the wrong rsync script with the wrong argument shape, so every retry is a guaranteed synthetic failure recorded as `error_category: "unknown"`.

**Strong areas:** run lifecycle/finalization, release/provenance tooling, preflight, error-category taxonomy, the HHM config registry, key handling in the hardened rsync scripts, and log-note redaction discipline. These need no change.

**Most valuable improvements:** rotate + purge the committed credential; stop passwords reaching error messages (switch to `sshpass -e`/env-passed secrets and redact exec errors); make queue drains write-then-clear; add the two missing connection timeouts; fix the retry dispatch contract. All are small, surgical changes.

**Is significant architectural work justified? No.** The architecture (run-once dispatcher → per-job modules → shell scripts → Redis queues → drain jobs → Postgres) fits the problem. What *is* justified is aggressive **deletion**: roughly 40% of the repo's files are dead (73/73 vendored SQL files under `utils/db/sql/**` unused, ~30 dead shell scripts, ~15 dead JS modules, the entire `db/normalize` seed archive), and the duplication that remains (two exec-rsync twins, copy-pasted `runJob`, ~15 near-identical GE shell variants) has already caused real drift bugs (BUG-004 exists because a timeout fix landed in one twin but not the other).

---

## System Overview

### What the application is

A Node.js **run-once pipeline fleet** for medical-imaging fleet telemetry acquisition. Cron (24 entries in the matt-teixeira user crontab) invokes `docker compose run --rm app_tools node index.js <run_group> [schedule] [manufacturer] [modality]` from the release copy. Each run does its work, self-logs to disk + `util.app_run_logs`, and exits with a graded code (`run_outcome/v1`: 0 success/skipped, 1 failed, 2 partial, 3 usage) consumed by ops-dashboard and incident-engine.

### Run groups and what they actually do

| Run group | Schedule | What it does |
|---|---|---|
| `hhm <man> <mod>` | :00/:30 (8 families) | Pulls equipment log files from GE/Philips/Siemens systems over lftp/scp/curl into `/workspace/files/<SME>` (host: `/opt/resources/acqu_files`). **File parsing/DB insertion of the pulled data is NOT this app** — the sibling `hhm_rpp_*` apps do that. This app records connection status into Redis. |
| `mmb <0-7>` | :16/:46, :19/:49 | Per-schedule mag/edu config fetch → parallel single-file rsync pulls via `jobs/mmb/read/sh/rsync_mmb.sh`. Parsing is the sibling `mmb-rpp`'s job. |
| `philips` | :58/:28 | Philips-MRI directory-mirror rsync (root `read/sh/rsync_mmb.sh` variant) + local file fan-out (`relocate_files/rsync_local.js`). |
| `althea_env` | :16/:46 | Serial scp pull of env logs from althea VMs + reverse-scan for the last capture timestamp. |
| `ip_reset` | :10/:40, :17/:47, :20/:50 (one shared flock) | Drains `ip:queue`, looks up tunnels in `util.ip_sec`, **(reset itself bypassed — see below)**, retries each queued system once, results → `online:queue`. |
| `offline_alert` | :15/:45, :22/:52 | Drains `online:queue` → upserts `alert.offline_{hhm,mmb}_conn` heartbeats + appends `stats.acquisition_history` / `stats.tunnel_run_summary`. |
| `system_reset_totalizer` | :18/:48 | Drains `system_reset_totalizer:queue` → increments `daily_total`/`lifetime_total` counters on the alert tables. |
| `demo_systems`, `update_ipsec`, `ip_sec`, `update_db_creds` | unscheduled/manual | Demo exercisers; VNS3→`util.ip_sec` sync; `config.acquisition.vpn` flagger; one-shot credential re-encryption. |

### Data flow (the Redis backbone)

Producers (every acquisition wrapper) push per-system results to three Redis LISTs on the shared `redis_dev-0-4` instance:

- **`ip:queue`** — first-attempt *connection-class* failures (full system row + retry args). Consumer: `ip_reset`.
- **`online:queue`** — successes, second-attempt failures, and non-connection failures. Consumer: `offline_alert` → Postgres heartbeat/stats tables.
- **`system_reset_totalizer:queue`** — one entry per reset-worthy failure. Consumer: `system_reset_totalizer`.

Acquisition **cursors** (Philips CV daily/lod directory positions) are plain Redis keys (`<SME>.last_phil_cv_daily` etc.). Postgres holds config (`config.acquisition/mag/edu`, `systems`, `hhm_credentials`), the alert/stats sinks, `util.ip_sec` (VPN tunnel map), and the shared `util.app_run_logs` run record.

### ip_reset: current state and re-enablement readiness

**What it does today** (`jobs/tunnel_reset/index.js`): read `ip:queue` (LRANGE 0..1000) → extract IPs → look up tunnels in `util.ip_sec` → **skip the actual VNS3 reset** → `DEL ip:queue` → 5s vestigial settle wait → pre-fetch credentials per (manufacturer, modality) → build and run all retries in parallel → drain/DEL the queue again → log leftovers. The Redis-drain + DB-insert pipeline the owner needs is intact and functioning.

**The bypass** is exactly [jobs/tunnel_reset/index.js:65-72](jobs/tunnel_reset/index.js#L65-L72): a commented split-batch block plus a commented single-line `// await resetTunnels(run_log, tunnels_by_ip);`.

**Re-enablement assessment — the single-line path is coherent; four things have rotted around it:**

1. The **split-batch variant references `split_array`, which does not exist anywhere in the repo** — uncommenting lines 66-70 throws `ReferenceError`. Only line 72 is viable. Recommend deleting the dead block and keeping line 72 as the documented re-enable switch.
2. **`util.ip_sec` is going stale**: the `update_ipsec` job that feeds it is not cron-scheduled (npm script only), is **additions-only** (changed `endpoint_id`/`tunnel_id` never updated, removed tunnels never deleted — [utils/vpn/ipsec-update-util.js:85-104](utils/vpn/ipsec-update-util.js#L85-L104)), and its failure path is completely masked (BUG-006). Re-enabled resets would bounce stale/wrong tunnel IDs. Fix BUG-006, make the sync an upsert-and-prune, and schedule it before re-enabling.
3. **Philips-MRI systems would never get their tunnel bounced**: `read/exec-remote_rsync.js:112-118` queues them without an `mmb_ip` field, so `extract_ip` yields `undefined` → SQL NULL → "no tunnel found" (part of BUG-003).
4. `resetTunnels` itself (`utils/vpn/reset-tunnels.js`) is intact and imported; `VNS3_IP`/`VNS3_PW` remain documented in `.env.example` and CLAUDE.md. Fix SEC-006/SEC-007 (TLS verification, error logging) in the same pass.

### Build / test / deploy

Dev clone → `build.sh` (in-tree `npm install` + image build) → `build-release.sh` (clean-tree guard, tar-mirror to `/opt/apps`, `#RELEASE:` env overrides, `RELEASE_SHA` stamp, svc image build) → cron runs the release copy. `preflight-check.sh` does real authenticated environment checks. **There are no automated tests, no linting, and no CI of any kind** (confirmed; the `.gitignore` `test*/` entries have no corresponding directories). There was consequently nothing to run for this audit beyond static verification; no test/lint/build failures to report separately.

---

## Critical Findings

### SEC-001 — Plaintext device credential and plaintext-equivalent ciphertexts committed to the repository
- **Location:** [util/encrypt/index.js:19-26](util/encrypt/index.js#L19-L26) (commented block containing `encryptString("<real credential>")` / `decryptString("<hex ciphertext>")` calls); [util/encrypt/old_to_new_process.js:71-81](util/encrypt/old_to_new_process.js#L71-L81) (sample `hhm_credentials` row with `user_enc`/`password_enc` hex values in a comment). Values not reproduced here.
- **Evidence:** verified directly. The same file hardcodes `const key = "your-encryption-key"` and uses the deprecated `crypto.createCipher` (AES-256-CBC via MD5-based key derivation, no IV, no auth). Any "encrypted" value produced by this module is decryptable by anyone with repo access — the plaintext comment makes even that unnecessary. The repo's remote is a personal GitHub account (`Matt-Teixeira/data_acquisition`), and the file has been tracked across multiple commits, so history rewriting alone does not remediate.
- **Impact:** working service credentials for hospital imaging equipment are exposed to anyone with repo (or historical clone) access.
- **Recommendation:** (1) rotate the exposed credential(s); (2) strip the comments from both files; (3) purge history for `util/encrypt/*` (`git filter-repo`) and force-push; (4) consider moving the repo to an org account. Then (5) once a one-line SQL audit confirms all `hhm_credentials` rows are new-format (base64 `[salt|iv|tag|ct]` vs bare hex), delete the entire legacy path: `util/encrypt/index.js`, `enc_denc.js` (its byte-duplicate), `old_to_new_process.js`, the `update_db_creds` run group, and `run_scripts/update_db_creds.sh` (whose undocumented `node:16.20.2` pin exists only because `createCipher` was removed in Node ≥22).
- **Confidence:** High (verified first-hand).

---

## High-Priority Findings

### SEC-002 — Decrypted HHM passwords leak into cron output, `util.app_run_logs`, and the alert table on exec failure
- **Location:** [read/exec-hhm_data_grab.js:192](read/exec-hhm_data_grab.js#L192) (`console.log(error)`), [:215](read/exec-hhm_data_grab.js#L215) and [:295](read/exec-hhm_data_grab.js#L295) (`addLogEvent(E, …, error)` → `err_msg` in [utils/logger/log.js:62](utils/logger/log.js#L62)), and — worst — [:302](read/exec-hhm_data_grab.js#L302) where `error.message` becomes the `connection_error` field pushed to `online:queue` and ultimately stored in `alert.offline_hhm_conn.connection_error`. Same pattern in the sibling `read/exec-*.js` wrappers.
- **Evidence:** verified first-hand. HHM args are `[host_ip, decrypted_user, decrypted_password]` ([jobs/hhm/_configs.js](jobs/hhm/_configs.js)); `redactArgsForLog` correctly masks them in the CALL note — but when `execFile` rejects, Node's error message is `Command failed: timeout 840s ./read/sh/… <ip> <user> <password> <dest>`. That full plaintext command line reaches: the bounded cron `.out` under `/opt/run-logs/`, the per-run JSON log, `util.app_run_logs.verbose_log` **and** the `warn_error_logs` subset that ops-dashboard and incident-engine read, and (via the unknown-exception branch) a queryable column in the alert table.
- **Trigger:** any non-timeout, non-zero exit of an acquisition script — a routine occurrence.
- **Recommendation:** two complementary fixes. (1) Pass passwords via environment (`sshpass -e` / `SSHPASS`, lftp `--env-password` or `~/.netrc`) so they never appear on a command line — this also fixes SEC-004. (2) Add a scrubber that redacts the known arg positions from `error.message`/`error.stack`/`error.cmd` before any logging/queueing (the positions are already known to `redactArgsForLog`).
- **Confidence:** High (verified first-hand).

### SEC-003 — `update_db_creds` prints the entire decrypted credential table to stdout
- **Location:** [util/encrypt/old_to_new_process.js:38-39](util/encrypt/old_to_new_process.js#L38-L39) (`console.log(credentials.old)` — plaintext id/user/password objects) and [:65-66](util/encrypt/old_to_new_process.js#L65-L66) (full re-read rows).
- **Impact:** every execution of `node index.js update_db_creds` dumps all device credentials in plaintext into docker logs and, in production, the cron/ops `.out` capture. The job also has no transaction and no format marker — a second run feeds new-format base64 into the old decryptor and throws mid-table; a crash mid-loop leaves the table half-migrated.
- **Recommendation:** log ids/counts only. Better: delete the whole path per SEC-001 step 5 (it has served its migration purpose — BACKLOG §2 records it done 2026-08-20).
- **Confidence:** High (verified first-hand).

### BUG-001 — All Redis queue drains clear the queue before the Postgres writes: mid-run failure = permanent data loss
- **Location:** [util/tools/offline_alert.js:23-30](util/tools/offline_alert.js#L23-L30) (`insertHeartbeat`: get → `clear_redis_online_queue()` → *then* upserts + stats); [util/tools/system_reset_totalizer.js:23-26](util/tools/system_reset_totalizer.js#L23-L26) (same shape).
- **Evidence:** verified first-hand. `insertHeartbeat` has no try/catch of its own; a failed upsert propagates to `onBoot`'s catch with the queue already deleted. The four upsert statements are independent autocommits (there are **zero** `db.tx`/`db.task` call sites in the repo), so a death between them leaves the heartbeat tables partially updated for that cycle.
- **Impact:** a transient PG outage or container kill during `offline_alert` silently discards a cycle's heartbeats — `alert.offline_*_conn.capture_datetime` stays stale, so downstream offline alerting can fire false positives or mask a real transition. The totalizer loses increments the same way.
- **Trigger:** DB error / SIGKILL / OOM between the `DEL` and the writes; both jobs run every half hour.
- **Recommendation:** reorder to **read → write PG → clear**. Replays are safe for the alert upserts (`ON CONFLICT (system_id)`); wrap the four statements in one `db.tx`. The totalizer's increments are the only non-idempotent replay — acceptable (over-count on rare replay beats silent loss), or guard with a drained-marker.
- **Confidence:** High (verified first-hand).

### BUG-002 — `ip:queue` drain is non-atomic, and the post-retry second `DEL` destroys concurrent producers' pushes
- **Location:** [jobs/tunnel_reset/index.js:20](jobs/tunnel_reset/index.js#L20) (LRANGE) vs [:74](jobs/tunnel_reset/index.js#L74) (DEL), and [:172-173](jobs/tunnel_reset/index.js#L172-L173) (read-then-DEL again after retries); getter cap in [redis/ip_queue.js:52-57](redis/ip_queue.js#L52-L57) (`LRANGE 0 1000`) vs whole-key `DEL`.
- **Evidence:** verified first-hand. With `ip_reset=true` no retry re-pushes to `ip:queue`, so anything found at line 172 can only be a *concurrent producer's* push — it is logged as "Data not acquired post tunnel reset" and deleted, never retried. The schedule makes overlap routine: HHM runs start :00/:30 with per-system 840s timeouts, mmb at :16/:46, while ip_reset fires at :10/:17/:20 (+:30 offsets); producers and consumer hold *different* flocks. Additionally, LRANGE returns at most 1001 entries but DEL removes the whole key — a backlog beyond that is destroyed unread (same pattern on `online:queue`).
- **Impact:** a system's one retry request vanishes; because first-attempt failures don't push `online:queue`, that failure is also invisible to `offline_alert` for the cycle.
- **Recommendation:** atomic drain — `LPOP key count` / `LMPOP`, or `RENAME ip:queue ip:queue:processing` and drain the renamed key — and drop the second-drain `DEL` entirely (leave late arrivals for the next run).
- **Confidence:** High (verified first-hand).

### BUG-003 — Philips-MRI retry path is structurally broken: wrong script, wrong arg shape, no tunnel IP
- **Location:** [jobs/tunnel_reset/index.js:101-115](jobs/tunnel_reset/index.js#L101-L115) (hardcodes `./jobs/mmb/read/sh/rsync_mmb.sh` for every `data_source === "mmb"` entry, ignoring the `system.rsyncShPath` the producers deliberately ship); producers [read/exec-remote_rsync.js:112-118](read/exec-remote_rsync.js#L112-L118) (3-arg `rsyncShArgs` for the root directory-mirror script, and **no `mmb_ip` field**) vs [jobs/mmb/read/exec-rsync.js:95](jobs/mmb/read/exec-rsync.js#L95) (5-arg shape); [util/tools/tunnel_reset.js:29-31](util/tools/tunnel_reset.js#L29-L31) (`extract_ip` reads `entry.mmb_ip`).
- **Evidence:** independently found and confirmed by two separate investigations. `jobs/mmb/read/sh/rsync_mmb.sh` runs under `set -ue` and references `$4`/`$5`; with the philips 3-arg payload bash dies with `unbound variable`, no regex matches that text, and the retry is recorded as `error_category: "unknown"`, `successful_acquisition: false`. The missing `mmb_ip` also means `undefined` lands in the tunnel-lookup IP list, so even with resets re-enabled these systems' tunnels would never be bounced.
- **Impact:** every Philips-MRI connection failure's second chance is a guaranteed synthetic failure that also pollutes the connection-status/stats tables with bogus "unknown" categories.
- **Trigger:** any Philips-MRI rsync failing with connection-class stderr, then the next `ip_reset` run — deterministic.
- **Recommendation:** dispatch on the stored `system.rsyncShPath` (it exists in every payload precisely for this), and include `mmb_ip` in the exec-remote_rsync payload. Add the regression test described in TEST-001.
- **Confidence:** High.

### BUG-004 — `jobs/mmb/read/exec-rsync.js` has no timeout at all; a hung ssh strands the schedule's flock indefinitely
- **Location:** [jobs/mmb/read/exec-rsync.js:53](jobs/mmb/read/exec-rsync.js#L53) — `await execFile(rsyncShPath, rsyncShArgs);` with no coreutils `timeout` wrapper, no `{ timeout }` option, no `maxBuffer`. The `error.code === 124` branch at [:149-171](jobs/mmb/read/exec-rsync.js#L149-L171) describes a wrapper that is not there (dead code).
- **Evidence:** verified first-hand; contrast the hardened twin [read/exec-remote_rsync.js:52-60](read/exec-remote_rsync.js#L52-L60) (two-layer timeout, SIGKILL, 10MB maxBuffer). `rsync --timeout=60` inside the script covers I/O stalls but not an ssh connect/auth hang.
- **Impact:** one host that hangs ssh (blackholed TCP, tarpit) hangs the whole `mmb <N>` run forever; the run never finalizes (no run record — monitoring reads "never ran"), and `flock -n` silently skips every subsequent cycle of that schedule until manual intervention. A standing acquisition outage with no error trail.
- **Recommendation:** apply the exact `exec-remote_rsync` pattern. Root cause is REF-001 (the twins should be one module — this fix would then have landed in both).
- **Confidence:** High (verified first-hand).

### BUG-005 — Redis connect can hang any run forever (no bounded connect; the 30s failsafe never arms)
- **Location:** [redis/redis_instance.js:28](redis/redis_instance.js#L28) — `await redisClient.connect()` with default config; node-redis v4's default `reconnectStrategy` retries indefinitely. The `index.js` 30s force-exit failsafe is only set inside `finalizeRun`, which is only reached in `finally` — a *pending* connect means `finally` never runs.
- **Impact:** with Redis down/unreachable, every job that touches a queue (all acquisition + drain jobs) hangs, holds its flock, skips all subsequent cron fires, and writes no run record. Same blast pattern as DB-001.
- **Recommendation:** pass `socket.connectTimeout` and a bounded `reconnectStrategy` (return an `Error` after N retries) in `initRedis` so `connect()` rejects and the existing catch paths + exit contract take over.
- **Confidence:** High on mechanism (verified the code; retry-forever is node-redis 4.6 default behavior).

### BUG-006 — `update_ipsec` failure is doubly masked: a `ReferenceError` inside the catch, then logged as INFO → job reports success
- **Location:** [utils/vpn/ipsec-update-util.js:35](utils/vpn/ipsec-update-util.js#L35) (`note` declared inside the `try`) vs [:48](utils/vpn/ipsec-update-util.js#L48) (catch references `note` → `ReferenceError`); outer catch [utils/vpn/update-pg-ipsec-table.js:47](utils/vpn/update-pg-ipsec-table.js#L47) logs the error with type `I`; `deriveOutcome` counts only `type === "ERROR"` events.
- **Evidence:** verified first-hand in both files. Also [:59](utils/vpn/ipsec-update-util.js#L59): `remote_subnet.match(...)` used without a null-check (a non-matching subnet string throws, then gets masked the same way). `insert_into_db`'s catch has the same type-`I` masking.
- **Impact:** a VNS3-down / API-failure / bad-data run of `update_ipsec` exits 0 "success". Since this job is what keeps `util.ip_sec` honest, it is a monitoring blind spot squarely in the ip_reset re-enablement path.
- **Recommendation:** declare `note` before the `try`; log type `E` in both catches; null-guard the regex match.
- **Confidence:** High (verified first-hand).

### BUG-021 — `ge_mri_22_4.sh` reports SUCCESS on a total connection failure: two systems dark for 400+ runs while monitoring shows them healthy
- **Location:** [read/sh/GE/ge_mri_22_4.sh](read/sh/GE/ge_mri_22_4.sh) — the `file_list=$( ... || true )` command substitution followed by `if [[ -z ... ]]; then echo "No matching files found..." >&2; exit 0; fi`; consumed by [read/exec-hhm_data_grab.js](read/exec-hhm_data_grab.js) (exit 0 + no connection-error regex match => `successful_acquisition: true`).
- **Evidence (live, 2026-09-02):** SME21914 and SME21932 have logged
  `Unable to negotiate with <ip> port 22: no matching host key type found.
  Their offer: ssh-rsa,ssh-dss` on **411 and 375 runs respectively**, spanning
  the entire retained history (08-20 15:02 -> 09-02 16:34, i.e. every run).
  Their acquisition directories under `/opt/resources/acqu_files/` are EMPTY
  with a directory mtime of Jun 2. Meanwhile `alert.offline_hhm_conn` reports
  both as `successful_acquisition = t`, `capture_datetime = 09-02 16:00`,
  `error_category = NULL` — i.e. green on the dashboard.
- **Two independent defects:**
  1. **The masking (systemic).** `|| true` swallows the ssh failure, the empty
     result is treated as "no new files", and `exit 0` tells the wrapper the
     run succeeded. ANY failure of this script — auth, network, host key —
     is reported as success. This is the concrete, live instance of BUG-019.
  2. **The proximate cause.** `ge_mri_22_4.sh`'s `SSH_OPTS` lacks
     `-o HostKeyAlgorithms=+ssh-rsa` and `-o PubkeyAcceptedAlgorithms=+ssh-rsa`,
     which its sibling `ge_mri_22_1.sh` carries and which are exactly what these
     legacy hosts (offering only `ssh-rsa,ssh-dss`) require. 22_1's systems
     acquire normally; 22_4's cannot connect at all.
- **Impact:** two imaging systems have acquired nothing for at least the full
  13 days of retained history while reporting healthy — the failure is
  invisible to ops-dashboard, incident-engine, and the offline-alert path
  because the alert row says success with a current timestamp.
- **Recommendation:** (a) add the two missing algorithm options to 22_4's
  `SSH_OPTS`, matching 22_1; (b) separately, make the no-files path
  distinguish "connected, nothing new" from "never connected" — fail loudly
  (or set `run_log.outcome = "skipped"`) instead of exiting 0 on a dead
  connection. (b) matters more than (a): it is what let (a) hide for months.
- **Found:** during SEC-004 family-1 verification, by comparing acquired-file
  mtimes against the run record rather than trusting the run outcome.
- **Severity:** HIGH · **Confidence:** High (live data, before/after identical)

### DB-001 — `db/pgPool.js` lacks the fleet connection timeout: an unreachable DB hangs half the run groups forever
- **Location:** [db/pgPool.js:34-43](db/pgPool.js#L34-L43) — config ends at `application_name`; no `max`, `idleTimeoutMillis`, or `connectionTimeoutMillis`. Its sibling [utils/db/pg-pool.js:42-49](utils/db/pg-pool.js#L42-L49) carries the fleet standard (decided 2026-08-27) with the rationale in-code: *"a hung connect must ERROR by 10s — with no timeout, an unreachable DB hangs the run forever and the empty cron .out reads as 'never ran'."*
- **Evidence:** verified first-hand. Pool A is the first query for `mmb`, `demo_systems`, `hhm` (config/creds reads via `sql/qf-provider`), and `ip_sec`.
- **Impact:** exactly the failure mode the fleet standard was written to kill, still live in this app's most-used pool: hung run, held flock, silently skipped cycles, no run record.
- **Recommendation:** apply the identical block — or better, resolve DB-002 by deleting Pool A entirely.
- **Confidence:** High (verified first-hand).

---

## Medium-Priority Findings

### BUG-007 — One corrupt queue entry destroys the whole batch
- **Location:** [redis/online_queue.js:76-82](redis/online_queue.js#L76-L82) and [redis/ip_queue.js](redis/ip_queue.js) (both `get_*` helpers `JSON.parse` inside a try whose catch returns `undefined`); consumers [util/tools/offline_alert.js:25-28](util/tools/offline_alert.js#L25-L28), [util/tools/system_reset_totalizer.js:23-26](util/tools/system_reset_totalizer.js#L23-L26).
- **Evidence:** if any element fails to parse, the getter returns `undefined` after a successful LRANGE; the consumer then **still clears the queue** (deleting every valid entry unread) and crashes iterating `undefined`. (`reset_tunnel` accidentally survives — its TypeError fires before its clear.)
- **Recommendation:** parse per-element with skip-and-log; never return `undefined` from the getters.
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-008 — althea_env reports success with a stale timestamp when the pull fails; first-ever failure is invisible
- **Location:** [util/tools/list_new_files_althea_env.js:31-57](util/tools/list_new_files_althea_env.js#L31-L57); enabler [read/exec-pull_files_vm.js:47-51](read/exec-pull_files_vm.js#L47-L51) (catches everything, returns `[]`, caller never checks).
- **Evidence:** on a failed pull the previous run's local file still exists in the mounted volume, so the code reads the *old* capture marker and enqueues `successful_acquisition: true` with the stale timestamp. If the local file never existed, `fsp.open` throws ENOENT into a catch that only `console.log`s — no ERROR event, no queue row.
- **Impact:** connectivity monitoring shows success for failed althea pulls; offline detection depends entirely on downstream frozen-data heuristics.
- **Recommendation:** return a success flag from `exec_pull_vm_files`; enqueue `successful_acquisition: false` + category on failure; ERROR-log the ENOENT path with `system_id`.
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-009 — `reset_tunnel` clears the queue before building retries: a creds-fetch failure loses everything queued
- **Location:** [jobs/tunnel_reset/index.js:74](jobs/tunnel_reset/index.js#L74) (`DEL`) vs [:92](jobs/tunnel_reset/index.js#L92) (`await config.fetchCredentials(...)` in the pre-fetch loop, outside any per-item catch — a SQL failure throws to the function-level catch at :191 with the queue already gone).
- **Recommendation:** move the clear after job construction (or the atomic-claim key from BUG-002 covers this too).
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-010 / PERF-001 — Philips CV path-doubling defeats the backfill check: re-pulls + re-unzips every cycle
- **Location:** [jobs/hhm/philips/philips_cv.js:150](jobs/hhm/philips/philips_cv.js#L150) — `system.debian_server_path = \`${fallback}/files/${system.id}\`` where `fallback` is already `<cwd>/files` ([:86](jobs/hhm/philips/philips_cv.js#L86)) → `/workspace/files/files/SME…`, a path that never exists (verified: the grab writes to single-`files` paths).
- **Evidence:** verified first-hand. `file_exists` at [:157](jobs/hhm/philips/philips_cv.js#L157)/[:186](jobs/hhm/philips/philips_cv.js#L186) therefore always returns false, so the "double check on current state" block re-pulls `Event.zip` over FTP and re-runs the unzip for `last_aquired_dir` on **every** run for every reachable CV system (~40 systems × every 30 min).
- **Impact:** wasted FTP transfer + unzip each cycle; the intended idempotency check does nothing (no data corruption — overwrites are identical bytes).
- **Recommendation:** drop the extra `files/` segment.
- **Confidence:** High (verified first-hand). **Severity:** MEDIUM.

### BUG-012 — `rsync_local` logs ERROR with `err = null` → TypeError in the logger masks the real failure; fail-fast `Promise.all` abandons in-flight siblings
- **Location:** [relocate_files/rsync_local.js:79](relocate_files/rsync_local.js#L79) (`addLogEvent(E, …, note, null)`) crashing at [utils/logger/log.js:62](utils/logger/log.js#L62) (`err.stack` on null — verified; this is the repo's only E-with-null call site); the rejection then propagates through [jobs/philips_mri/rsync_philips-mri.js:52-64](jobs/philips_mri/rsync_philips-mri.js#L52-L64)'s fail-fast `Promise.all`, and `finalizeRun` closes pools / arms the 30s force-exit while sibling rsyncs (including `--delete` mirrors) are mid-flight.
- **Recommendation:** pass the caught `error`; harden `addLogEvent` (`err?.stack ?? err ?? "no error object"`); use `Promise.allSettled` in the philips_mri and demo_systems drivers.
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-013 — `ip_sec` run group: fire-and-forget `db.any` inside a loop
- **Location:** [jobs/tools/ip_sec.js:21](jobs/tools/ip_sec.js#L21) — `db.any(query_str, value);` un-awaited, inside an O(N×M) nested loop.
- **Evidence:** verified first-hand. Updates race `finalizeRun`'s `job_db.$pool.end()`; failures are unhandled rejections. Also: the sync is one-way (`vpn = TRUE` only — never cleared when a tunnel disappears) and issues one UPDATE per match instead of one `WHERE system_id = ANY($1)`.
- **Recommendation:** collect matches, `await` one batched UPDATE; decide whether `vpn` should also be cleared.
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-014 — Totalizer semantics: `daily_total` never resets; cross-source dedupe collision; increments for absent rows silently lost
- **Location:** [util/tools/system_reset_totalizer.js:43-65](util/tools/system_reset_totalizer.js#L43-L65).
- **Evidence:** (1) nothing in this repo (or greppable siblings on this host) ever resets `daily_total` — it is a second lifetime counter; (2) `duplicate_systems` is one flat id array, so a system failing on both hhm *and* mmb in the same window gets only its first source incremented (contrast `offline_alert`'s `${data_source}:${id}` key); (3) `UPDATE … WHERE system_id=$1` on a system with no heartbeat row yet affects 0 rows silently.
- **Recommendation:** decide what `daily_total` means (add a daily reset or rename); dedupe by `(data_source, id)`; consider `INSERT … ON CONFLICT` so first-contact failures count.
- **Confidence:** High. **Severity:** MEDIUM.

### BUG-015 — Philips CV missing-config guard logs but does not skip; failure then unattributable
- **Location:** [jobs/hhm/philips/philips_cv.js:88-104](jobs/hhm/philips/philips_cv.js#L88-L104) — the `if (!system.host_ip || !system.credentials_group)` block logs INFO (with a duplicated `system:` key clobbering the first) and **falls through**; `decrypt_string(undefined_creds.user_enc)` then TypeErrors into the outer `Promise.all` catch at [:69-71](jobs/hhm/philips/philips_cv.js#L69-L71), which logs a generic ERROR labeled `get_ge_cv_data` (wrong pipeline) with `note = null` — no `system_id`, so `deriveOutcome.failed_systems` misses it. Latent today (all live CV rows have both fields).
- **Recommendation:** `return` after the guard; per-system try/catch carrying `system_id` (the `runHhmJob` pattern); fix the label.
- **Confidence:** High. **Severity:** MEDIUM (latent).

### BUG-017 — Early log-write-stream error crashes the process before any run record exists
- **Location:** [utils/logger/log.js:23-25](utils/logger/log.js#L23-L25) — `fs.createWriteStream` opens at module load; the only `'error'` listener is attached at end-of-run inside `writeLogEvents`. An open-time EACCES/ENOENT (unwritable mounted log dir the entrypoint repair didn't cover) emits `'error'` with no listener → uncaught exception, no run record anywhere.
- **Recommendation:** attach a boot-time `'error'` handler that stashes the error for `writeLogEvents` to report.
- **Confidence:** High. **Severity:** MEDIUM.

### DB-002 — Two live pools to the same database, with divergent and dangerous fallback defaults
- **Location:** [db/pgPool.js](db/pgPool.js) (Pool A: `index.js`, all three qf-providers, `ip_sec`, `old_to_new_process`) vs [utils/db/pg-pool.js](utils/db/pg-pool.js) (Pool B: logger, offline_alert, totalizer, vpn modules). `buildSsl()` is line-for-line identical in both.
- **Evidence:** Pool A silently defaults to `host: "pg_db"`, `database: "dev"`, `user: "postgres"`, `application_name: "pg_manage"` (another app's name) when env is missing — a missing `.env` sends half the app toward a different database while the other half errors. Up to 25 sockets for a single-process cron app; DB-side attribution split across two names.
- **Recommendation:** consolidate on Pool B; delete the misleading fallbacks so misconfiguration fails loudly (this also delivers DB-001).
- **Confidence:** High. **Severity:** MEDIUM.

### DB-003 — The repo's DDL no longer matches what the code writes; no schema source of truth
- **Location:** [db/tables/TABLES.sql](db/tables/TABLES.sql) vs [util/tools/offline_alert.js:72-89](util/tools/offline_alert.js#L72-L89); [db/tables/hhm_credentials.sql](db/tables/hhm_credentials.sql) vs the live table shape.
- **Evidence:** the DDL defines `alert.offline_hhm_conn(system_id, capture_datetime, inserted_at)` while the app writes five more columns and updates two counters; `hhm_credentials.sql` creates a differently-named table (`hhm_creds`) with a different shape; `TABLES.sql` is largely inert (its `BEGIN` blocks end in `ROLLBACK`; a trigger uses `$ $` for `$$`); there is no DDL at all for `util.app_run_logs` (a partitioned table maintained by the sibling odd-jobs app — if its partition creation lapses, every run here exits 2).
- **Recommendation:** snapshot the live schema (`pg_dump --schema-only` of the written tables) into the repo; quarantine or delete the scratch DDL.
- **Confidence:** High (code-vs-DDL comparison; live DB not inspected). **Severity:** MEDIUM.

### DX-002 — `cron-bk/crontab.restore-2026-08-24.cron` is stale yet self-recommends installation
- **Location:** [cron-bk/crontab.restore-2026-08-24.cron](cron-bk/crontab.restore-2026-08-24.cron) header ("Install: `crontab <this file>`"), recently touched (2026-09-01 comment edit) so it reads as maintained.
- **Evidence:** its GE RPP, Philips RPP, and incident-engine blocks are the pre-2026-08-26 legacy entries (no flock, no `-T`, npm-run indirection, unbounded output), and incident-engine points at the `/opt/apps/incident-engine-deploy` worktree that `docs/schedules.md` records as retired 2026-08-26. The *live* crontab itself matches `docs/schedules.md` exactly (verified — no drift there).
- **Impact:** following the file's own instruction would silently revert three apps' hardening and schedule a job from a nonexistent directory. CLAUDE.md points at this file as *the* restore mechanism.
- **Recommendation:** regenerate the body from `crontab -l`, re-date it, and add "regenerate before relying on this" to the header.
- **Confidence:** High (agent-verified against the live crontab). **Severity:** MEDIUM (operational trap).

### DX-008 — Runtime version is unpoliced: `node:lts` unpinned in four places, plus a load-bearing undocumented `node:16` pin
- **Location:** [docker/Dockerfile:1](docker/Dockerfile#L1), [docker-compose.yaml:43](docker-compose.yaml#L43), [build.sh:30](build.sh#L30), [run_scripts/ge_ct.sh:7](run_scripts/ge_ct.sh#L7); [run_scripts/update_db_creds.sh:4](run_scripts/update_db_creds.sh#L4) pins `node:16.20.2` (EOL) with no comment explaining that the pin exists because `crypto.createCipher` was removed in Node ≥22 (SEC-001's legacy path).
- **Impact:** an LTS-line jump changes the runtime under every job with no code change; a well-meaning "bump to lts" on the creds script breaks it cryptically. No `engines` field anywhere.
- **Recommendation:** pin `node:<major>-bookworm`, bump deliberately; the node:16 script disappears with SEC-001 step 5. **Severity:** MEDIUM.

### SEC-004 through SEC-009 — see Security Findings below (medium-severity security items).

---

## Low-Priority Findings

- **BUG-011** — Philips CV cursor advances during the *pull* loop, but unzip happens in a later loop: a kill or unzip failure between them permanently skips intermediate dirs' `EventLog.txe` (the backfill check only examines the last dir — and is itself broken per BUG-010). [jobs/hhm/philips/philips_cv.js:220-244](jobs/hhm/philips/philips_cv.js#L220-L244). Advance the cursor only after the corresponding unzip. *Confidence: Medium.*
- **BUG-016** — `mmb` with a missing/typo'd schedule arg becomes `parseInt(null)` → `NaN` → pg cast error → caught → exit 2 "partial", not exit 3 "usage" — weakening the fail-loud contract the unknown-run-group case gets right. Validate 0-7 in [index.js](index.js) before dispatch. *Confidence: High.*
- **BUG-018** — [jobs/mmb/boot/get-machine-configs.js:17](jobs/mmb/boot/get-machine-configs.js#L17) `pg_tables[0]` throws on a NULL `pg_tables` row and the re-raise aborts the **entire schedule** (all systems skipped) instead of one system. Per-row guard. *Confidence: High.*
- **BUG-019** — outcome grading inconsistency: a script that fails but exits 0 (error text in stderr only) logs WARN, not ERROR ([read/exec-hhm_data_grab.js:138-175](read/exec-hhm_data_grab.js#L138-L175)) — such a run can grade `success`. Narrow in practice (live scripts exit non-zero on failure). *Confidence: Medium.*
- **BUG-020** — [jobs/mmb/sql/boot/get-mag-by-schedule.sql](jobs/mmb/sql/boot/get-mag-by-schedule.sql) lacks the Philips-MRI exclusion its demo twin has; protection rests only on those rows carrying NULL schedules in the DB. A config edit would double-acquire through the wrong pipeline. *Confidence: Low-Medium (DB values not verifiable from the repo).*
- **DB-004** — no unique key on `stats.acquisition_history(run_id, system_id, phase)`; `util.app_run_logs` uniqueness is procedural only (the `finalize_started` once-guard). Add uniques if the partitioning allows. *Confidence: High.*
- **Logger/module nits** — `utils/logger/log.js` exports a **positional array** consumed by comma-skipping destructures in ~6 files (one reorder silently breaks all imports); `logger.js`'s error-branch overwrites its accumulated `argInfo`; dead winston scaffolding remains in `log.js`; [redis/online_queue.js:13](redis/online_queue.js#L13) logs `system.system_id` where producers pass `id` (always `undefined`); payload field `app_name` actually carries the run group.
- **qf-provider catch bugs** — [sql/qf-provider.js:44-50](sql/qf-provider.js#L44-L50): `updateDateTime`'s catch references undefined `uuid` (ReferenceError-in-catch) and its `return db.any(...)` means the try/catch can never catch; `get_althea_env_systems` swallows errors and returns `undefined`, surfacing later as an unrelated `TypeError: systems is not iterable` ([jobs/server_hop/althea_env.js:19-25](jobs/server_hop/althea_env.js#L19-L25)). Let these throw; `onBoot` records honestly.
- **Config threading** — the `vpn` flag is selected by the boot SQL, dropped by `get-machine-configs.js`, then read off the positional config array as `config.vpn` (always `undefined`) and stored into ip:queue payloads. Inert today; thread it or delete it. [jobs/mmb/index.js:68](jobs/mmb/index.js#L68).
- **Shell quoting** — unquoted `$2 $3 $4 $5` expansions in [jobs/mmb/read/sh/rsync_mmb.sh:20](jobs/mmb/read/sh/rsync_mmb.sh#L20), root [read/sh/rsync_mmb.sh:28](read/sh/rsync_mmb.sh#L28), [read/sh/althea-env/althea_server_rsync.sh](read/sh/althea-env/althea_server_rsync.sh), and unquoted creds inside the lftp `-c` bodies of the live grab scripts. Config-DB-sourced, so exploitability is low; robustness gap (a space breaks transfers; SEC-004 overlaps). Quote everything; a `shellcheck` pass would have caught all of these.
- **`prune-run-logs.sh` nits** — the "repo-local dev logs" stage iterates `/opt/apps/*/utils/logger`, never `~/apps/*`, so dev-clone run logs grow unpruned (BACKLOG 6f knows); an empty-`kb` edge under `set -e` at [:56-64](scripts/prune-run-logs.sh#L56-L64); dry-run summary wording. Deletion safety itself is good (verify-before-delete, exact-name deletion).
- **`cron-suspend.sh` writes its backup to a *tracked* file** (`cron-bk/crontab.bak`) — dirties the tree mid-maintenance and an accidental `git checkout` replaces the freshest backup with a stale one.
- **`build-release.sh`** — no guard against releasing while cron jobs are mid-flight (the wipe races the :00/:30 burst against a bind-mounted running container); `APP_NAME` parse doesn't strip inline comments; three different `.env` parsers across build.sh / build-release.sh / preflight. *Medium-adjacent; grouped here because the race window is operator-chosen.*
- **`preflight-check.sh` nits** — `env_val` doesn't strip quotes (build.sh's does); `REL_DIR` derives from the dev clone's basename (wrong path if the clone is renamed).
- **Empty-queue runs** of `ip_reset`/`offline_alert` grade `success` rather than `skipped` (the `run_log.outcome = "skipped"` opt-in is never used by any job).
- **`index.js` philips dispatch** passes `capture_datetime` into the voided `job_id` parameter of `rsync_philips_mri` — harmless, misleading.
- **`sql/system/hhm_credentials.sql`** — `WHERE manufacturer = $1 AND modality = $2 OR manufacturer = 'avante'` relies on precedence; parenthesize.
- **`sqlBool`** ([util/tools/offline_alert.js:21](util/tools/offline_alert.js#L21)) maps the string `"false"` to TRUE; inputs are real booleans today.

---

## Security Findings

*(SEC-001/002/003 above are the critical/high items.)*

### SEC-004 — Passwords on command lines: `sshpass -p` and `sftp://user:pass@host` (MEDIUM)
~40 scripts under `read/sh/` pass credentials as argv (e.g. [read/sh/GE/ge_ct_22.sh:14](read/sh/GE/ge_ct_22.sh#L14), [read/sh/Philips/phil_cv_22.sh:7](read/sh/Philips/phil_cv_22.sh#L7)) — visible in `/proc/*/cmdline` for the transfer's duration (same-UID container processes + host root/svc), and unquoted, so a password containing a space or glob breaks auth. Fix together with SEC-002: `sshpass -e` / env-passed secrets, quote all expansions. *Confidence: High.*

### SEC-005 — Host-key verification gaps beyond the accepted-risk baseline (MEDIUM)
- [read/sh/Philips/phil_ct_v2.sh:4](read/sh/Philips/phil_ct_v2.sh#L4): `StrictHostKeyChecking=no` + `UserKnownHostsFile=/dev/null` — zero verification. **CORRECTED 2026-09-01: this script is LIVE (1 system in `config.acquisition`), not dead as originally reported.** It must be FIXED, not deleted.
- [docker/Dockerfile:29-32](docker/Dockerfile#L29-L32): image-wide `set sftp:auto-confirm yes` in `/etc/lftp.conf` — every lftp connection blind-trusts.
- Pervasive `accept-new` in GE/Philips scripts with the ssh bundle mounted `:ro` — accepted keys never persist, so every run is a blind first contact (the exact problem BACKLOG 1d fixed for the rsync path only).
Extend the `rsync_mmb.sh` hardening pattern (`-F /opt/resources/ssh/config`, central known_hosts, `known_hosts_migrate.sh` seeding) to the sshpass/lftp scripts. *Confidence: High.*

### SEC-006 — VNS3 API: TLS verification disabled while sending Basic auth (MEDIUM)
[utils/vpn/ipsec-update-util.js:18-27](utils/vpn/ipsec-update-util.js#L18-L27) and [utils/vpn/reset-tunnels.js:19-30](utils/vpn/reset-tunnels.js#L19-L30): `rejectUnauthorized: false` + `Authorization: Basic …VNS3_PW…`. Pin the appliance cert/CA instead. Fix before ip_reset re-enablement. *Confidence: High.*

### SEC-007 — VNS3 admin password can leak via `console.log(error)` on an axios failure (MEDIUM)
[utils/vpn/ipsec-update-util.js:47](utils/vpn/ipsec-update-util.js#L47): axios 0.21 errors carry enumerable `config.headers.Authorization`. Currently bounded because `update_ipsec` is manual-only; becomes recurring if scheduled (which the re-enablement path recommends). Log `error.message`/status only. *Confidence: High (mechanism).*

### SEC-008 — Residual hardcoded credentials in dead-but-tracked scripts (MEDIUM — rotate & delete)
- [read/sh/Siemens/siemens_cerb_ftp.sh:14](read/sh/Siemens/siemens_cerb_ftp.sh#L14): a real `curl -u user:password` FTP credential (confirmed dead and DELETED 2026-09-01; note the sibling `siemens_cerb.sh` is LIVE with 12 systems and was kept; adjacent to the 2026-08-14 audit's SEC-02, which caught a different file).
- [read/sh/telnet_ip_tables.sh:1](read/sh/telnet_ip_tables.sh#L1): an IP + two passwords in a comment (dead script).
- [read/sh/Philips/phil_mmb_data_grab_example.sh:6](read/sh/Philips/phil_mmb_data_grab_example.sh#L6): a well-known vendor default password in a tracked example.
Rotate whatever is still valid; delete the files (all three are in the dead-code inventory). *Confidence: High.*

### SEC-009 — Hand-built SQL in `offline_alert` escapes remote-influenced text instead of parameterizing (MEDIUM, defense-in-depth)
[util/tools/offline_alert.js:17-21](util/tools/offline_alert.js#L17-L21) (`sqlLit`) + the VALUES template literals at :98-182. `connection_error` can carry raw remote stderr (via [jobs/mmb/read/exec-rsync.js:180](jobs/mmb/read/exec-rsync.js#L180) and the SEC-002 path). Not currently exploitable (quote-doubling + `standard_conforming_strings=on`), but it is the only place untrusted-influenced text meets hand-built SQL, and its safety rests on a server GUC. The safe pattern (`pgp.helpers.insert` + ColumnSet) is already used 100 lines below in the same file for `stats.*` — convert. *Confidence: High.*

### SEC-010 — `$1:raw` table-name interpolation in the dead `updateDateTime` chain (LOW here)
[sql/system/updateDateTime.sql](sql/system/updateDateTime.sql), [sql/prepared-statements/updateDateTime.js:5](sql/prepared-statements/updateDateTime.js#L5) (+ its byte-duplicate "copy"): `UPDATE $1:raw …` — no escaping at all. Zero live callers in this app, but it is exported and is the canonical pattern the sibling rpp apps copy. Delete here; anywhere it lives, use `$1:name`/`pgp.helpers.TableName`. *Confidence: High.*

### Secrets hygiene — positive findings
`.env` was never committed (git history checked); no private keys tracked; `preflight-check.sh` masks secrets and passes them via env; release `.env` permissions are deliberate (640 svc:docker, documented). The redaction helpers (`redactArgsForLog`, `systemLogShape`) are applied consistently at CALL sites — SEC-002's leak is exclusively via error objects, not notes.

---

## Performance Findings

- **PERF-001** — the BUG-010 path-doubling re-pulls `Event.zip` over FTP and re-unzips for every reachable Philips CV system every 30 min. Fixing the one-line path bug eliminates the single largest unnecessary recurring transfer in the app. *(MEDIUM — measurable network/IO waste.)*
- **PERF-002** — every Redis push/get/clear opens and quits a fresh client (2-3 connects per system per run across the fleet). Correctly closed on all paths (no leak), but one shared client per run would remove hundreds of TCP+AUTH handshakes per cycle. *(LOW.)*
- **PERF-003** — unbounded `Promise.all` fan-out: one child process per system, all at once (`runHhmJob`, `onBootMMB`, philips_mri). Fine at current fleet size (~tens per family); worth a concurrency cap (e.g. p-limit of 8-16) before the fleet grows — it also softens the burst load the cron stagger design exists to manage. *(LOW/INFO.)*
- **PERF-004** — `ip_sec` O(N×M) nested matching + one UPDATE per match (BUG-013's batch fix covers this). *(LOW.)*
- **PERF-005** — `onBootMMB`/demo dump the full `systems_configs` array into INFO events every run, inflating `util.app_run_logs.verbose_log` rows. The flush also `JSON.stringify`s the whole event array in one shot — bounded per-stream at 4KB (good) but unbounded in event count. Consider a byte cap. *(LOW.)*
- Pool consolidation (DB-002) also halves the connection budget per run.

---

## Refactoring Opportunities

**Tier 1 — reduces real, demonstrated risk:**
- **REF-001: merge the exec-rsync twins.** [jobs/mmb/read/exec-rsync.js](jobs/mmb/read/exec-rsync.js) (189 lines) and [read/exec-remote_rsync.js](read/exec-remote_rsync.js) (199 lines) are the same classification/queueing state machine; drift has already produced BUG-004 (timeout hardening in one only) and the BUG-003 payload divergence. One module with a file-vs-mirror mode, carrying the retry contract (`rsyncShPath`, `rsyncShArgs`, `mmb_ip`) explicitly.
- **REF-002: make the retry contract explicit.** `tunnel_reset` should dispatch purely on payload fields the producers ship (they already ship `rsyncShPath` "to match tunnel_reset expectations" — the consumer just ignores it). This is the structural fix behind BUG-003.
- **REF-003: object configs, not positional arrays.** The mmb machine-config positional array caused the inert `vpn` threading bug and makes every consumer index-fragile. Same for `utils/logger/log.js`'s positional export array (comma-skipping destructures in 6+ files).

**Tier 2 — worthwhile cleanup:**
- **REF-004:** demo_systems' `runJob` is a verbatim copy of `jobs/mmb/index.js`'s — import it instead (demo's design intent of exercising real paths is right; the copy defeats it).
- **REF-005:** the GE `_22_*` shell variants differ only in their `-oKexAlgorithms=` bundle; [read/sh/Philips/_phil_mri_lib.sh](read/sh/Philips/_phil_mri_lib.sh) already demonstrates the right pattern (central `SSH_OPTS_MODERN/LEGACY` + shared body). Extend it to GE/Philips-CT/CV and delete the dead variants.
- **REF-006:** demo SQL duplicates production queries with IN-lists bolted on (and only the demo copy carries the Philips exclusion — BUG-020's drift). Parameterize the production files with `WHERE sys.id = ANY($1)`.
- **REF-007:** the three `.env` parsers across build.sh / build-release.sh / preflight-check.sh should be one sourced helper.

**Tier 3 — stylistic; skip unless touching anyway:** enum imports (`seq, qaf`) unused across many files; `for await` over plain arrays; `("use strict")` no-op statements.

---

## Testing Gaps

There are **no tests, no lint, no CI**. The single most valuable additions, in order:

1. **TEST-001 — retry-contract replay test.** Feed each queue-producer's exact payload shape through `tunnel_reset`'s dispatch and assert the script path + arg arity match what the target script requires. This directly regression-protects BUG-003 and would have caught it at introduction.
2. **TEST-002 — queue-drain semantics.** Unit-test the drain helpers for: write-then-clear ordering (BUG-001), corrupt-entry skip (BUG-007), and the >1000-entry cap (BUG-002's overflow leg), with a mocked/ephemeral Redis.
3. **TEST-003 — formalize the `connection_regex.js` fixture suite.** BACKLOG 1c describes a six-case ordering test that was run ad hoc and discarded; the ordering rules (root-cause-before-symptom, `host_key_changed` before `host_key_unknown`) are exactly the kind of invariant a committed fixture file protects.
4. **TEST-004 — `shellcheck` wired into `build.sh`.** With ~40 credential-handling shell scripts, this is the highest-value static check available: it flags every unquoted `$3` password, the root `althea_server_pull.sh` quoting break, and the `$PATH`-as-data misuse.
5. **TEST-005 — exit-code contract test.** A tiny harness asserting `deriveOutcome` grading (fatal→1, error events→2, usage→3, skipped→0) so ops-dashboard/incident-engine's contract can't drift.

---

## Dead Code / Simplification Opportunities

Grep-verified inventory (deleting all of this removes roughly 40% of the repo's files and none of its behavior):

**Vendored sibling-app SQL — 100% dead here:**
- `utils/db/sql/**`: all 62 `.sql` files (alert-notify, alert-processor, reports, mmb-rpp, odd-jobs, aws-ff, preflight-check) are loaded only by `utils/db/sql/sql.js`, which nothing requires. Within the *live* `utils/db/sql/pg-helpers.js`, only the `util.app_run_logs` and `stats.*` ColumnSets are used (~60 of 463 lines).
- `db/sql/**`: 11 `.sql` files + `sql.js` + `pg-helpers.js` — an older snapshot of the same registry; nothing requires either JS file.
- `utils/db/sql/pg-helpers_hhm.js` (578 lines) — the parse-layer schema used by the `hhm_rpp_*` siblings; imported by nobody here.

**Dead JS (would crash if revived, in several cases):**
`jobs/tools/build_mmb_config.js` (imports six functions `sql/qf-provider` doesn't export → `undefined()` TypeError), `jobs/mmb/sql/pg-helper-provider.js` (requires a `jobs/mmb/parse/` directory that doesn't exist), `jobs/hhm/run_manual.js` (imports a non-export; calls exec fns with pre-refactor arity), `jobs/read_dir.js` (self-executes against a stale hardcoded path), `jobs/build_config/**` (three **zero-byte** GE files + a stub), `jobs/mmb/helpers/index.js`, `util/tools/file_date_format.js` (references undefined `date`), `read/exec-tunnel_reset.js`, `read/exec-ip_table.js` + `jobs/host_ts/ip_tables.js`, `read/exec-list_files.js`, `read/exec-tail.js`, `read/get-filesize-delta.js`, `db/pgPool_old.js` (+ its `BaltimoreCyberTrustRoot.crt.pem`), `utils/db/pg-pool copy.js` (note: passes the CA via `cert:` instead of `ca:` — never fix, just delete), `utils/vpn/update-pg-ipsec-table_old.js` (100% commented), `utils/config-processor/**` (all three files), `sql/prepared-statements/**` (including the byte-duplicate "updateDateTime copy.js"), `util/tools/tunnel_reset.js::group_queue_keys`, `jobs/mmb/sql/qf-provider.js::getOnBootData` + the imported-but-never-called `get_systems_by_schedule`.

**Dead SQL among this app's own files:**
`sql/system/`: `insert_mmb_acqu.sql`, `insert_mmb_edu.sql`, `insert_mmb_m.sql`, `mmb_configs.sql`, `system-data.sql`, `update_edu_array.sql`, `update_mag_array.sql` (never registered), plus `ip-address.sql`, `getPgTable.sql`, `updateDateTime.sql`, `get_mod_man.sql`, `phil_mri_systems_log.sql`, `one_system.sql` (registered, reachable only through dead exports). `jobs/mmb/sql/boot/`: `get-systems-configs.sql`, `get-system-by-schedule.sql`. **Net live SQL surface of the whole app: 13 files.**

**Dead shell scripts** — **CORRECTED 2026-09-01.** The original list below the correction was
produced from an incomplete DB sweep and was WRONG: it named ~15 scripts that are in fact
referenced by `config.acquisition` and serve ~90 systems (`ge_ct_22_2` 21 systems,
`ge_mri_22` 14, `siemens_cerb` 12, `ge_cv_22*`, `ge_mri_22_2`, `phil_ct_data_grab_{2,3}`,
`phil_ct_v2`, `phil_mri_data_grab_{1,2,5,7,8,9}`, `phil_mmb_data_test`, `ge_ct_21_1`,
`ge_ct_22_4`, `ge_mri_22_3`). **Acting on that list would have taken those systems dark.**

Authoritative method (re-run before any future deletion): dead = files on disk MINUS
`SELECT DISTINCT acquisition_script FROM config.acquisition` MINUS every `*.sh` basename
appearing in any `.js` or `.sh`. Verified result: **67 script files, 37 DB-referenced,
18 code-referenced, 19 truly dead** (and zero DB rows pointing at a missing script).

The 19 (18 deleted 2026-09-01; `utils/sh/port_test.sh` left alone as vendored):
`Philips.sh`, `Siemens.sh`, `althea_server_pull.sh`, `althea_server_pull_old.sh`,
`althea_server_pull_old_2.sh`, `ge_ct_22.sh`, `ge_cv_sftp.sh`, `ge_mri_22_origin.sh`,
`list_files.sh`, `list_files_old.sh`, `phil_ct_data_grab_4.sh`,
`phil_mmb_data_grab_example.sh`, `phil_mri_data_grab.sh`, `phil_mri_mmb.sh`,
`philips_ct_data_grab_ftp.sh`, `siemens_cerb_ftp.sh`, `tail.sh`, `tunnel_reset.sh`,
plus the closed dead chain `telnet_ip_tables.sh` + `read/exec-ip_table.js` +
`jobs/host_ts/ip_tables.js`.

**Still-dead files OUTSIDE `read/sh` (not covered by the sweep above; unchanged, still
valid):** root `althea_server_pull.sh` (broken lftp quoting + plaintext password argv if
ever revived), `key_copy.sh` (a notes file with a `.sh` extension — executing it would run
its scp commands), `run_scripts/ge_ct.sh` and `run_scripts/start.sh` (old-server paths,
run-as-root, runtime `apt-get`), and `read/exec-tail.js` (unreferenced; its `tail.sh` is
already gone).

- `docker/note_from_Docker_2.yml` (stale fragment, hardcoded public IP)

**Non-runtime operator artifacts to archive:** the entire `db/normalize/**` tree (27 seed SQL files + the 3,771-line `schedule_0.js` scratch worksheet — not a module; requiring it throws). Note **`db/normalize/staging/mmb_config.sql:2` is corrupt** (`INSERT\n\tINTOSME15819 config.acquisition(` — a stray paste; fails at statement 1 if ever run). Filename typos (`*_nrom.sql`, `siemens_mri_norm.sql.sql`, `mmb_config copy.sql`) are cosmetic. Move to `migrations-archive/` or delete — the data lives in the `config.*` tables now.

**Commented-out code worth resolving:** the `split_array` block in `tunnel_reset` (references a nonexistent function — delete, keep the line-72 re-enable switch); the disabled `add_to_redis_queue` calls at [read/exec-hhm_data_grab.js:127,167](read/exec-hhm_data_grab.js#L127) (a deliberate partial-disable of retry queueing on clean-exit branches — document or remove); the commented `phil_cv_21_trace.sh` call site.

---

## Dependency / Configuration Findings

**Dependencies (verified by repo-wide require grep):**

| Package | Verdict |
|---|---|
| `dotenv`, `pg-promise`, `luxon`, `redis` | Used. |
| `pg` | Never required directly; transitive via pg-promise. Harmless as a pin. |
| **`uuid`** | **Phantom dependency (DX-001):** required in 8 files (`utils/logger/log.js`, `jobs/hhm/_shared.js`, `jobs/mmb/index.js`, `jobs/tunnel_reset/index.js`, …) but **not declared** — it resolves only because `short-uuid` (itself never required) drags in `uuid@8.3.2`. Removing "unused" short-uuid without adding uuid breaks the entire app. |
| `cron`, `ioredis`, `lodash`, `pm2`, `short-uuid` | Zero requires. `ioredis` duplicates `redis`; `pm2` is a daemon process manager in a run-once cron app. |

Fix as **one deliberate change**: `npm rm cron ioredis lodash pm2 short-uuid && npm i uuid`.

**Environment variables:**
- Used but absent from `.env.example`: `EXEC_TIMEOUT_MS`, `SHELL_TIMEOUT_S`, `RSYNC_SHELL_TIMEOUT_S`, `POSTPROCESS_SHELL_TIMEOUT_S` (real tuning knobs), `PG_APP_NAME` (defaults to the misleading `"pg_manage"`).
- In `.env.example` but unused by this app: the entire `SRC_*/DST_*` migration block (belongs to pg_manage tooling).
- Dead-by-design (CLAUDE.md documents it): the `RUN_ENV`/`*_HHM_FILES` switch in the phil_cv exec files — verified genuinely inert.
- `package.json` name is `"data-processor"` (not the app's name); the `"man"` script targets a nonexistent `manual` run group (exit 3).

**Config/ops:**
- `docs/schedules.md` matches the live crontab **exactly** (verified) — excellent. The stale restore file is DX-002 above.
- `.gitignore` traps (DX-004): `logger.js` and `*.json` are ignored patterns while `logger.js`/`package.json`/`package-lock.json` are tracked-but-ignored — works today, but silently blocks `git add` of any future JSON fixture/config, and the entries mislead.
- A dozen stale `DEV_*` remote branches; origin HEAD still points at `PROD` while work happens on `STAGING_docker`.

---

## Documentation / Developer Experience Findings

- **CLAUDE.md is accurate on every claim tested** (build-release behavior, logger contract, scheduling story, exit-code contract, the dead RUN_ENV switch, the update_db_creds bypass). This is the repo's best asset for a new developer.
- **DX-003: README.md is stale (front-door contradiction)** — "Run model (current, verified 2026-07-27)" describes the pre-paradigm world: image `data-acqu:staging`, the retired node_mod_cache, `RUN_ENV=dev` logging, npm-run invocation. All superseded 2026-08-24. Rewrite as a short pointer to CLAUDE.md.
- **DX-009:** [docs/docker_server_full_setup_2.0.md:717](docs/docker_server_full_setup_2.0.md#L717) claims `db/pgPool.js` is a dead file — it is required by `index.js` and every qf-provider. An operator following the doc could delete a live pool.
- Root-level clutter: five dated audit/triage reports, a 160KB pre-git HTML guide, `JULY7_DARK_SYSTEMS.csv` — move to `docs/attic/` (which is already well-segregated).
- Misleading log labels (copy-paste): Philips and Siemens dispatchers log `"get_ge_data"`; the CV catch logs `"get_ge_cv_data"` ([jobs/hhm/philips/index.js:7,27](jobs/hhm/philips/index.js#L7), [jobs/hhm/siemens/index.js:7,27](jobs/hhm/siemens/index.js#L7), [jobs/hhm/philips/philips_cv.js:71](jobs/hhm/philips/philips_cv.js#L71)) — anyone triaging by label is misled.
- The `util/` vs `utils/` split (app-local vs vendored-shared) is an unexplained convention a newcomer will trip on; one README line each would fix it. The vendored tree's 100%-dead SQL makes the DB layer look ~10× larger and far more dangerous than the real 13-file live surface.

---

## Recommended Remediation Plan

### Phase 1 — Immediate Risk (small, surgical; no dependencies between items)
1. **SEC-001**: rotate the exposed credential; strip the comments; purge `util/encrypt/*` history; plan the legacy-crypto deletion (needs the one-query format audit first).
2. **SEC-002 + SEC-004** (one change): move passwords off command lines (`sshpass -e` / lftp env) in the live scripts, and add the exec-error redactor. **SEC-003**: delete the credential `console.log`s (or the whole job if the format audit passes).
3. **DB-001 + BUG-005**: add `connectionTimeoutMillis` (+ max/idle) to `db/pgPool.js` and a bounded connect/reconnect to `redis_instance.js`. Two tiny diffs that eliminate both "hung run, silent cron starvation" modes.
4. **BUG-001**: reorder all three drains to read → write → clear (wrap `offline_alert`'s four statements in one `db.tx`).
5. **BUG-003 + BUG-002**: dispatch retries on `system.rsyncShPath`, add `mmb_ip` to the exec-remote_rsync payload; switch drains to `LPOP count`/rename-claim and drop the second `DEL`.
6. **BUG-006**: fix the `note` scope + type-`I` masking in the vpn modules (prerequisite for trusting `update_ipsec` at all).
7. **SEC-008**: rotate/delete the residual hardcoded credentials in the three dead scripts.

### Phase 2 — Reliability
1. **BUG-004** via **REF-001**: merge the exec-rsync twins with the two-layer timeout (fixes the missing mmb timeout as a by-product).
2. **BUG-007/008/009**: per-element queue parsing; althea failure honesty; move `reset_tunnel`'s clear after job construction (partially subsumed by Phase 1.5's claim-key).
3. **BUG-012/015/017**: null-error logging hardening + `Promise.allSettled`; CV guard skip + label fixes; boot-time write-stream error handler.
4. **BUG-014**: totalizer semantics decision (daily reset, per-source dedupe, upsert).
5. **TEST-001..005**: retry-contract replay test, drain-semantics tests, connection_regex fixtures, shellcheck in build.sh, exit-code contract test. Write TEST-001/002 *alongside* the Phase 1/2 fixes they protect.
6. **DX-002**: regenerate the cron restore file. **BUG-016**: validate the mmb schedule arg.
7. **ip_reset re-enablement readiness** (when the owner wants it): schedule `update_ipsec`; make it upsert-and-prune; SEC-006/007; delete the `split_array` block. After that, re-enabling is uncommenting line 72.

### Phase 3 — Refactoring
1. **DB-002**: consolidate on `utils/db/pg-pool.js`; delete Pool A and the silent fallbacks (do *after* Phase 1.3 so the timeout fix isn't blocked on the refactor).
2. **REF-002/003**: explicit retry-contract payloads; object configs replacing positional arrays (machine configs, logger exports).
3. **REF-004/006**: demo reuses production `runJob` and parameterized production SQL.
4. **REF-005**: extend the `_phil_mri_lib.sh` pattern to the GE/Philips script families (delete dead variants first — Phase 5 can precede this).
5. **SEC-009**: convert `offline_alert`'s hand-built VALUES to `pgp.helpers.insert` (natural to do with BUG-001's tx work if preferred earlier).
6. **DB-003**: snapshot the live schema into the repo; **DB-004**: add the uniques.

### Phase 4 — Optimization
1. **PERF-001** is delivered by BUG-010's one-line fix (do it in Phase 2 if convenient — it's trivial).
2. **PERF-002**: one shared Redis client per run.
3. **PERF-003**: concurrency cap on the per-system fan-outs (only if fleet growth or DB load makes it worthwhile).
4. **PERF-004/005**: batched `ip_sec` UPDATE (with BUG-013); trim per-run config dumps from INFO events.

### Phase 5 — Cleanup
1. Delete the dead-code inventory (JS, SQL, shell) — safest done *after* Phase 2's tests exist and in a few reviewable commits (vendored SQL tree; dead JS; dead shell; `db/normalize` archive). SEC-008's credential carriers went here (done 2026-09-01). NOTE: SEC-005's worst offender `phil_ct_v2.sh` is LIVE and must be fixed, not deleted.
2. **DX-001**: the one-shot dependency fix (`npm rm … && npm i uuid`) — do this *before* any future dep cleanup someone else might attempt, since removing short-uuid naively breaks the app.
3. **DX-003/009**: README rewrite; fix the doc 2.0 dead-file claim. Root-level clutter to `docs/attic/`.
4. `.gitignore` de-trapping; stale branch pruning; `package.json` name + `man` script; undocumented env knobs into `.env.example`; drop the unused `SRC_*/DST_*` block.
5. **DX-008**: pin `node:<major>`; `engines` field; retire the node:16 script with SEC-001 step 5.

**Ordering rationale:** Phase 1 items are independent one-to-two-file diffs, deployable via the existing release flow one at a time with cron-cycle verification (the process BACKLOG 6 established). Phase 2's tests should land with, not after, the behavior fixes. Phase 3's pool consolidation depends on Phase 1.3; script-family refactors are easier after Phase 5.1's deletions, so interleave at will. Nothing here requires a schema migration or downtime beyond the normal release window.

---

## Final Summary

| ID | Severity | Category | Finding | Location | Confidence | Recommended Action |
|---|---|---|---|---|---|---|
| SEC-001 | CRITICAL | Security | Plaintext device credential + plaintext-equivalent ciphertexts committed; hardcoded key, deprecated `createCipher` | util/encrypt/index.js:19-26, enc_denc.js, old_to_new_process.js:71-81 | High | Rotate, strip, purge history; delete legacy crypto path after format audit |
| SEC-002 | HIGH | Security | Decrypted passwords leak into cron out, app_run_logs, alert table via execFile error messages — **redactor half FIXED 2026-09-01** | read/exec-hhm_data_grab.js:192,215,295,302 (+siblings) | High | Done: exec-error redactor. Remaining: env-passed secrets (SEC-004) |
| SEC-003 | HIGH | Security | `update_db_creds` prints decrypted credential table to stdout | util/encrypt/old_to_new_process.js:38-39,65-66 | High | Remove logs / delete job |
| BUG-001 | HIGH | Bug | Queue drains clear Redis before PG writes; no transactions — mid-run failure loses cycle data | util/tools/offline_alert.js:23-30, system_reset_totalizer.js:23-26 | High | Read → write (in tx) → clear |
| BUG-002 | HIGH | Bug | Non-atomic LRANGE+DEL; post-retry second DEL destroys concurrent pushes; 1000-entry cap vs whole-key DEL | jobs/tunnel_reset/index.js:20,74,172-173; redis/ip_queue.js:52-57 | High | Atomic drain (LPOP count / rename-claim); drop second DEL |
| BUG-003 | HIGH | Bug | Philips-MRI retry uses wrong script/args; payload lacks mmb_ip — every retry a synthetic failure | jobs/tunnel_reset/index.js:101-115; read/exec-remote_rsync.js:112-118 | High | Dispatch on payload `rsyncShPath`; add `mmb_ip` |
| BUG-004 | HIGH | Bug | mmb exec-rsync has no timeout; hung ssh strands schedule flock forever, no run record | jobs/mmb/read/exec-rsync.js:53 | High | Apply exec-remote_rsync two-layer timeout (via REF-001) |
| BUG-005 | HIGH | Bug | Redis connect can hang any run forever (unbounded connect/reconnect) | redis/redis_instance.js:28 | High | Bounded connectTimeout + reconnectStrategy |
| BUG-006 | HIGH | Bug | `update_ipsec` failures masked (ReferenceError in catch + INFO-typed error) → job exits 0 on total failure | utils/vpn/ipsec-update-util.js:35,48,59; update-pg-ipsec-table.js:47 | High | Fix scope; log type E; null-guard regex |
| DB-001 | HIGH | Database | `db/pgPool.js` missing fleet connection timeout — unreachable DB hangs half the run groups | db/pgPool.js:34-43 | High | Apply fleet pool block (or delete pool via DB-002) |
| BUG-021 | HIGH | Bug | ge_mri_22_4.sh reports success on total connection failure; 2 systems dark 400+ runs while dashboard shows green | read/sh/GE/ge_mri_22_4.sh | High | Add missing HostKeyAlgorithms opts; stop exiting 0 on a dead connection |
| BUG-007 | MEDIUM | Bug | One corrupt queue entry → getter returns undefined, clear still destroys batch | redis/online_queue.js:76-82 + consumers | High | Per-element parse, skip-and-log |
| BUG-008 | MEDIUM | Bug | althea_env logs success + stale timestamp on failed pull; first-ever failure invisible | util/tools/list_new_files_althea_env.js:31-57 | High | Success flag; failure rows; ERROR on ENOENT |
| BUG-009 | MEDIUM | Bug | reset_tunnel clears queue before creds fetch/job build — failure window loses retries | jobs/tunnel_reset/index.js:74 vs :92 | High | Clear after job construction / claim key |
| BUG-010 | MEDIUM | Bug/Perf | CV path-doubling (`files/files`) defeats backfill check → re-pull+re-unzip every cycle | jobs/hhm/philips/philips_cv.js:150 | High | Drop extra `files/` segment |
| BUG-012 | MEDIUM | Bug | E-log with null error → TypeError masks real failure; fail-fast Promise.all abandons in-flight siblings | relocate_files/rsync_local.js:79; rsync_philips-mri.js:52-64 | High | Pass error; harden addLogEvent; allSettled |
| BUG-013 | MEDIUM | Bug | Fire-and-forget `db.any` in loop; races pool shutdown; one-way vpn flag | jobs/tools/ip_sec.js:21 | High | Await one batched UPDATE |
| BUG-014 | MEDIUM | Bug | daily_total never resets; flat dedupe collides across sources; absent-row increments lost | util/tools/system_reset_totalizer.js:43-65 | High | Define daily semantics; (source,id) dedupe; upsert |
| BUG-015 | MEDIUM | Bug | CV missing-config guard doesn't skip; failure unattributed, mislabeled | jobs/hhm/philips/philips_cv.js:88-104,69-71 | High | Return after guard; per-system catch |
| BUG-017 | MEDIUM | Bug | Early write-stream error crashes process before any run record | utils/logger/log.js:23-25 | High | Boot-time 'error' handler |
| DB-002 | MEDIUM | Database | Two live pools, divergent silent fallbacks (`dev`/`postgres`/`pg_manage`) | db/pgPool.js vs utils/db/pg-pool.js | High | Consolidate on utils pool; fail loud |
| DB-003 | MEDIUM | Database | DDL drift: repo schema doesn't match written tables; no app_run_logs DDL | db/tables/*, db/normalize/tables.sql | High | pg_dump schema snapshot; quarantine scratch DDL |
| SEC-004 | MEDIUM | Security | Passwords in argv (`sshpass -p`, URL-embedded), unquoted | ~40 scripts in read/sh/ | High | `sshpass -e`/env; quote (with SEC-002) |
| SEC-005 | MEDIUM | Security | Host-key verification disabled (`=no`+/dev/null), image-wide lftp auto-confirm, non-persisting accept-new | phil_ct_v2.sh:4; docker/Dockerfile:29-32; GE/Philips scripts | High | Extend rsync_mmb.sh hardening pattern |
| SEC-006 | MEDIUM | Security | VNS3 TLS verification disabled with Basic auth | utils/vpn/ipsec-update-util.js:18-27; reset-tunnels.js:19-30 | High | Pin appliance cert |
| SEC-007 | MEDIUM | Security | VNS3 password leakable via `console.log(axios error)` | utils/vpn/ipsec-update-util.js:47 | High | Log message/status only |
| SEC-008 | MEDIUM | Security | Hardcoded credentials in three dead-but-tracked scripts — **files DELETED 2026-09-01; rotation still outstanding** | siemens_cerb_ftp.sh:14; telnet_ip_tables.sh:1; phil_mmb example | High | Rotate the credentials (deletion done) |
| SEC-009 | MEDIUM | Security | Hand-built SQL escapes remote-influenced text (GUC-dependent safety) | util/tools/offline_alert.js:17-21,98-182 | High | Convert to pgp.helpers.insert |
| DX-001 | MEDIUM | Dependency | Phantom `uuid` dep (8 requires, undeclared, transitive via unused short-uuid); 5 unused deps | package.json | High | `npm rm cron ioredis lodash pm2 short-uuid && npm i uuid` |
| DX-002 | MEDIUM | Config/Ops | Stale cron restore file self-recommends install; would revert 3 apps' hardening | cron-bk/crontab.restore-2026-08-24.cron | High | Regenerate from `crontab -l` |
| DX-003 | MEDIUM | Docs | README describes retired run model, contradicts CLAUDE.md | README.md | High | Rewrite as pointer |
| DX-008 | MEDIUM | Config | node:lts unpinned ×4; load-bearing undocumented node:16 pin | Dockerfile:1; compose:43; build.sh:30; update_db_creds.sh:4 | High | Pin major; retire node:16 with SEC-001 |
| DX-011 | MEDIUM | Ops | build-release wipes /opt/apps with no running-container guard | build-release.sh:78 | High | Check flocks/`docker ps` before wipe |
| BUG-011 | LOW | Bug | CV cursor advances before unzip; intermediate dirs skippable | jobs/hhm/philips/philips_cv.js:220-244 | Medium | Advance cursor post-unzip |
| BUG-016 | LOW | Bug | Bad mmb schedule arg → exit 2 not 3 | index.js mmb case | High | Validate 0-7 pre-dispatch |
| BUG-018 | LOW | Bug | NULL `pg_tables` row aborts entire schedule | jobs/mmb/boot/get-machine-configs.js:17 | High | Per-row guard |
| BUG-019 | LOW | Bug | Clean-exit failures grade WARN-only → run can read success | read/exec-hhm_data_grab.js:138-175 | Medium | Count clean-exit failures |
| BUG-020 | LOW | Bug | Production mag query lacks demo's Philips-MRI exclusion (config-guarded) | jobs/mmb/sql/boot/get-mag-by-schedule.sql | Low-Med | Add exclusion |
| SEC-010 | LOW | Security | `$1:raw` table interpolation in dead updateDateTime chain | sql/prepared-statements/*, sql/system/updateDateTime.sql | High | Delete; `:name` if resurrected |
| DB-004 | LOW | Database | No unique on stats.acquisition_history; run_id uniqueness procedural only | TABLES.sql / partitioned table | High | Add uniques |
| PERF-001 | MEDIUM | Performance | CV re-pull/re-unzip every cycle (= BUG-010) | philips_cv.js:150 | High | One-line path fix |
| PERF-002 | LOW | Performance | Fresh Redis client per queue op | redis/*.js | High | Shared client per run |
| PERF-003 | LOW | Performance | Unbounded per-system Promise.all fan-out | _shared.js, mmb/index.js, rsync_philips-mri.js | High | Concurrency cap when fleet grows |
| REF-001 | MEDIUM | Refactor | exec-rsync twins already drifted (caused BUG-004) | jobs/mmb/read/exec-rsync.js vs read/exec-remote_rsync.js | High | Merge with mode flag |
| REF-002 | MEDIUM | Refactor | Retry contract implicit; consumer ignores shipped rsyncShPath | tunnel_reset + producers | High | Explicit payload contract |
| REF-003 | LOW | Refactor | Positional arrays (machine config, logger exports) are reorder-fragile | boot/get-machine-configs.js; utils/logger/log.js:312-321 | High | Object shapes |
| REF-004 | LOW | Refactor | demo_systems copies mmb runJob verbatim | jobs/demo_systems/index.js:70-138 | High | Import shared |
| REF-005 | LOW | Refactor | ~15 GE/Philips script variants differ only in SSH opts | read/sh/GE/*, Philips/* | High | Extend _phil_mri_lib.sh pattern |
| REF-006 | LOW | Refactor | Demo SQL duplicates production queries (drift → BUG-020) | jobs/demo_systems/sql/* | High | `ANY($1)` param on production files |
| ARCH-001 | MEDIUM | Architecture | Vendored utils/ tree: 100% of its 62 SQL files + pg-helpers_hhm dead here; obscures the 13-file live surface | utils/db/sql/**, db/sql/** | High | Delete sibling-app material |
| TEST-001 | HIGH-value | Testing | No retry-contract test (would have caught BUG-003) | — | High | Payload replay test |
| TEST-002 | HIGH-value | Testing | No drain-semantics tests (BUG-001/002/007) | — | High | Mocked-Redis unit tests |
| TEST-003 | MEDIUM-value | Testing | connection_regex ordering tests ad hoc, discarded | util/tools/connection_regex.js | High | Committed fixture suite |
| TEST-004 | MEDIUM-value | Testing | No shellcheck over 40 credential-handling scripts | build.sh | High | Wire into build |
| TEST-005 | MEDIUM-value | Testing | Exit-code contract unprotected | index.js deriveOutcome | High | Contract test |
| DX-004 | LOW | DX | .gitignore ignores tracked live files (logger.js, *.json) — future adds silently blocked | .gitignore | High | Narrow patterns |
| DX-005 | LOW | DX | Copy-paste log labels (`get_ge_data` in Philips/Siemens paths) | jobs/hhm/{philips,siemens}/index.js; philips_cv.js:71 | High | Fix literals |
| DX-006 | LOW | DX | package name "data-processor"; broken `man` script | package.json | High | Rename; remove script |
| DX-007 | LOW | DX | 5 undocumented env knobs; unused SRC_*/DST_* block in template | .env.example | High | Sync template |
| DX-009 | LOW | DX | Doc claims live pool is dead | docs/docker_server_full_setup_2.0.md:717 | High | Correct doc |
| DX-010 | INFO | DX | Root clutter (audit MDs, 160KB HTML, CSV); 12 stale remote branches | repo root | High | Attic + prune |

*Also noted but intentionally not filed as defects:* the ip_reset bypass (owner decision — see re-enablement section), the dead RUN_ENV switches (BACKLOG 6f), host-key/inventory drift (BACKLOG 4a, parked), the winston retirement leftovers in `log.js` (BACKLOG 6f), and the dev-log pruning gap (BACKLOG 6f).
