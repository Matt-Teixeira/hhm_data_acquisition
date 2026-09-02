# Codebase Audit — data_acquisition (Plain-Language Edition)

**Date:** 2026-09-01

**What this document is:** a health check of the `data_acquisition` software, written so that anyone — not just a programmer — can understand what was found. Every finding has an ID code (like SEC-001 or BUG-003). The full engineering version, with exact file names, line numbers, and technical fixes, is in **`CODEBASE_AUDIT_TECHNICAL.md`** — the IDs match between the two documents, so "fix SEC-002" means the same thing in both.

**One thing checked with the owner first:** the "ip_reset" job used to restart VPN connections automatically. That feature was **turned off on purpose**, but the job still does important bookkeeping work that must be kept. This audit does *not* treat the turned-off feature as a problem. There is a section below on what would need attention if it's ever turned back on.

---

## What this system does (in plain terms)

Think of this system as an **automated courier service** for a fleet of hospital imaging machines (CT scanners, MRI machines, and similar, made by GE, Philips, and Siemens).

Every 30 minutes, on a fixed timetable, it:

1. **Dials into each machine** over secure network connections and **collects its log files** (the machines' diaries of what they've been doing). It saves those files to a shared folder. Other, separate programs read those files later and turn them into database records — this system's job is just the pickup.
2. **Keeps score of who answered the door.** Every attempt — success or failure — goes onto a shared notepad (a system called Redis). Follow-up jobs read that notepad and update a database that powers dashboards and alerts, so staff can see which machines are online, which are unreachable, and for how long.
3. **Gives failed machines a second chance.** If a machine didn't answer, it goes on a "try again" list. A separate job works through that list a few minutes later. (This is the job that used to also restart the VPN connection before retrying — the restart part is what's currently switched off.)
4. **Writes a report card for itself** after every run — what it did, what failed, and an overall grade — into a database that the monitoring dashboard and the incident system read.

The whole thing runs on a schedule (like a very reliable alarm clock), inside containers (pre-packaged software environments), and there's a well-organized process for moving new code from the "workshop copy" (where changes are made) to the "live copy" (what the schedule actually runs).

---

## The bottom line

**Overall: the core machinery is in good shape — the recent modernization work was done well. But there are some genuinely important problems around the edges, and most of them are cheap to fix.**

The five most important issues:

1. **A real password is written inside the code itself, and the code is stored on a personal GitHub account** (SEC-001). Anyone who has ever had access to that account's copy of the code could read a working password for hospital equipment. This is the one item that needs action *now*: change the password on the equipment, then scrub it out of the code and its history.
2. **When a pickup fails in certain ways, the machine's password gets copied into log files and into the database** (SEC-002). The system is careful to hide passwords in most places, but error messages slipped through the net — and those error messages get saved in several places that many people and programs can read.
3. **The score-keeping can silently lose a round of results** (BUG-001, BUG-002). The follow-up jobs erase the shared notepad *before* they finish copying it into the database. If anything goes wrong in that moment — a database hiccup, a crash — that half-hour's worth of "who's online" information is gone forever, and nobody is told. This can make the dashboard show stale information or trigger false "machine offline" alarms.
4. **Two ways the whole system can silently freeze** (DB-001, BUG-005). If the database or the notepad system is briefly unreachable at the wrong moment, a job can get stuck waiting *forever* — and because a stuck job holds its "one at a time" lock, every later scheduled run quietly skips itself. Worst of all, a stuck job writes no report card, so the monitoring shows *nothing* instead of an error. Two small settings ("give up after 10 seconds") fix this.
5. **The "second chance" retry is broken for one family of machines** (BUG-003). Philips MRI machines that fail their first pickup get a retry that is *guaranteed to fail* — the retry job hands the work to the wrong script with the wrong instructions. Two independent reviews confirmed this. It also pollutes the statistics with meaningless "unknown error" entries.

**What's healthy:** the run-and-report machinery, the deployment process, the pre-flight safety checks, the error-classification dictionary, and the documentation for engineers (CLAUDE.md) are all accurate and well-built.

**Is a big rebuild needed? No.** The design fits the job. What *is* needed is a good spring-cleaning: roughly **40% of the files in this project are dead weight** — old copies, abandoned experiments, and material belonging to sibling projects — and some of that dead weight contains leftover passwords and broken code that could trip someone up later.

---

## The findings, explained

Severity guide: **CRITICAL** = act now · **HIGH** = likely to cause real trouble · **MEDIUM** = real, fix in normal course · **LOW** = tidy-up.

### Theme 1: Passwords and secrets

**SEC-001 (CRITICAL) — A password is written in the code.**
Inside one of the code files there's a leftover note containing a real service password for imaging equipment, plus scrambled ("encrypted") versions of other passwords. Unfortunately the *unscrambling key* is written in the very same file — so the scrambled ones might as well be plain text too. Because code changes are permanently recorded (that's how git works), simply deleting the note isn't enough: the password must be **changed on the equipment**, the note removed, and the permanent record scrubbed. The scrambling method used is also an obsolete, weak one that modern software has removed entirely — the newer method used elsewhere in this project is good, so the old one should be retired completely.

**SEC-002 (HIGH) — Failed pickups can write passwords into logs and the database.**
The system normally masks passwords when it writes its diary (this was done thoughtfully). But when a pickup *fails* in an unexpected way, the automatic error message includes the entire command that was run — machine address, username, and password, unmasked. That error message then gets saved in the run report, the operations database, and in one case even the "why is this machine offline" table on the dashboard. Fix: pass passwords to scripts through a hidden channel instead of the command line, and scrub error messages before saving them.

**SEC-003 (HIGH) — One admin job prints every password to the screen.**
The one-time job that converts stored passwords from the old scrambling to the new one prints the entire list — in readable form — as it works. That output gets captured in log files. It already served its purpose (the conversion was done in August); the printing should be removed, or better, the whole obsolete job deleted.

**SEC-004 (MEDIUM) — Passwords are visible "over the shoulder" while transfers run.**
About 40 helper scripts pass passwords as part of the command itself, which means that while a transfer is running, anyone who can list running programs on the server can read the password. Same fix as SEC-002: use the hidden channel.

**SEC-008 (MEDIUM) — Three abandoned scripts still contain old passwords.**
Three scripts that nothing uses anymore have passwords written inside them, and they still ship with every release. Change those passwords wherever they're still valid, then delete the files.

### Theme 2: Losing track of results (the score-keeping problems)

**BUG-001 (HIGH) — The notepad is erased before the results are safely stored.**
The jobs that copy the "who's online" notepad into the database do it in the wrong order: *erase the notepad first, then write to the database*. If the database write fails or the job is interrupted, that round of results is gone with no trace. The fix is simply to reverse the order: write first, erase only after success.

**BUG-002 (HIGH) — Results added at the wrong moment get thrown away.**
The retry job reads the "try again" list, does its work, then erases the *entire* list — including any new entries other jobs added while it was working. Those machines lose their retry silently. There's also a size limit quirk: the job only ever reads the first ~1,000 entries but erases everything, so a large backlog would be partially destroyed exactly when things are already going wrong. The fix is a standard "take items off the list one at a time" approach instead of "read, then wipe everything."

**BUG-007 (MEDIUM) — One garbled entry ruins the whole batch.**
If a single entry on the notepad is malformed, the reading step gives up entirely — but the *erasing* step still runs. One bad entry destroys all the good ones. Fix: skip the bad entry, keep the rest.

**BUG-008 (MEDIUM) — One pickup type reports "success" even when it failed.**
The "althea" pickup job, when it can't reach its server, quietly reuses the *previous* run's file and reports success with an old timestamp. A machine could be unreachable for days while the dashboard shows it healthy. And if it fails on its very first attempt ever, nothing gets recorded at all.

**BUG-021 (HIGH) — Two machines have been reporting "healthy" while collecting nothing at all.**
Found on 2026-09-02 while verifying unrelated work. Two GE MRI machines (SME21914, SME21932) cannot connect at all — their equipment only speaks an old security standard that modern software refuses by default. That connection has failed on **every single run for the entire 13 days of records we keep** (411 and 375 runs). Yet the dashboard shows both as healthy with a current timestamp, because the collection script treats "couldn't connect" the same as "connected fine, nothing new" and reports success either way. Their storage folders are empty. Two fixes: tell the script to accept the older standard (its sibling script already does — that's why the other machines work), and separately stop the script reporting success when it never connected. The second matters more: it's what let the first hide.
**Fixed 2026-09-02.** Both halves. The connection fix was confirmed against the real machines — they now negotiate successfully. The reporting fix was proven with a before/after test: a failed connection used to report success and now reports failure, while both normal outcomes are unchanged.

**BUG-022 (HIGH) — A third machine is dark while showing green, for a different reason.**
Found 2026-09-02 by a fleet-wide sweep comparing every "healthy" claim against what is actually on disk. SME16377's collection script is waiting at a security prompt ("are you sure you want to connect?") that nothing ever answers. It waits 45 seconds, gives up, and reports success. Its storage folder is empty. This is the same *shape* as BUG-021 — a failure reported as success — but a different cause, and the error-classifying dictionary cannot catch it either, because the prompt's wording matches none of its patterns. Three fixes: tell the script to accept the machine's identity (every sibling script already does), make it fail loudly instead of quietly timing out, and teach the dictionary this wording.

**BUG-014 (MEDIUM) — The failure counters don't mean what they say.**
The table that counts "how many times has this machine needed a reset" has a *daily* counter that is never reset to zero (so it's just a second lifetime total), can miss a count when a machine fails in two ways at once, and silently drops the count for brand-new machines. The counters people might be making decisions from are quietly wrong.

**BUG-009 (MEDIUM)** — A cousin of BUG-001 inside the retry job: it erases its list before it has even finished preparing the retries, so an early failure loses everything that was queued.

### Theme 3: Jobs that can freeze forever

**DB-001 (HIGH) — One of the two database connectors has no "give up" timer.**
The project's own team standard (adopted in August) says: if the database can't be reached within 10 seconds, stop and report an error. One of the two database connectors follows this; the other — used by half the jobs — doesn't. A job using it during a database hiccup waits forever, and (because of the one-at-a-time lock) all its future scheduled runs silently skip. The monitoring sees nothing — the job looks like it "never ran."

**BUG-005 (HIGH) — Same problem with the notepad system (Redis).**
The connection to Redis retries forever by default. If Redis is down, *every* job freezes the same silent way. One small settings change fixes it.

**BUG-004 (HIGH) — One transfer type has no time limit.**
Most pickup scripts have a two-layer "if this takes more than N minutes, kill it" safety net. One of the two transfer modules — the twin of a properly protected one — is missing it entirely. A single machine that hangs mid-connection freezes that whole schedule group, silently, until someone notices. (This happened because the safety net was added to one twin and not the other — see Theme 6 on duplication.)

**BUG-017 (MEDIUM)** — If the folder that run reports are written to isn't writable, the program crashes before it can record anything at all. A one-line safety catch fixes it.

### Theme 4: The retry system and the switched-off VPN reset

**BUG-003 (HIGH) — Philips MRI retries are guaranteed to fail.**
When a Philips MRI machine fails its pickup, the retry job hands the retry to the wrong helper script with instructions in the wrong format. The script immediately errors out, and the failure gets logged as "unknown error." Every Philips MRI retry, every time. (Ironically, the original job carefully attaches a note saying *which* script to use — the retry job just ignores the note.) The fix is to read the note.

**BUG-006 (HIGH) — The job that maintains the VPN address book can fail invisibly.**
There's a job (`update_ipsec`) that refreshes the system's map of VPN connections. It has two bugs stacked on top of each other, with the combined effect that if it fails *completely* — VPN controller down, bad data, anything — it still reports "success." Nobody would know the address book is stale.

**About the switched-off reset (not a defect — status report):**
The reset itself is disabled by exactly one commented-out line, and the surrounding bookkeeping (drain the list, look up the tunnels, retry, record results) all still works — which is what the owner wants preserved. If the real resets ever come back, four things need attention first:

1. One of the two disabled code paths refers to a helper function that **no longer exists anywhere** — only the simple one-line version can be turned back on. The broken one should be deleted so nobody trips on it.
2. The VPN address book is going stale: the job that feeds it isn't on the schedule, only ever *adds* entries (never updates or removes them), and hides its own failures (BUG-006). Reactivated resets would be aiming at out-of-date targets.
3. Philips MRI machines never make it into the reset list correctly (part of BUG-003), so their tunnels would never get bounced.
4. The connection to the VPN controller skips certificate checking and could leak its admin password into logs on error (SEC-006, SEC-007 below) — worth fixing in the same pass.

### Theme 5: Connection security

**SEC-005 (MEDIUM) — Some connections don't verify who they're talking to.**
When one computer connects to another over SSH, it's supposed to check the other side's "fingerprint" to make sure it's not an impostor. Most of this system does that properly (there was good hardening work in August). But: one script disables the check entirely, the container image turns it off globally for one transfer tool, and many scripts use a "trust on first sight" mode that — due to a read-only settings folder — actually means "trust *every* time." Extending the existing good pattern to these scripts closes the gap.

**SEC-006 / SEC-007 (MEDIUM) — The VPN controller connection is too trusting.**
The system talks to the VPN controller with certificate checking turned off (so an insider on the network could impersonate the controller and capture the admin password), and one error path would print the password-bearing request details into logs.

**SEC-009 / SEC-010 (MEDIUM/LOW) — Two database queries built the risky way.**
Almost all database queries in this system are built the safe, modern way. Two spots build them by gluing text together — one of them using text that ultimately comes from the remote machines' error output. Today there are protective measures that make abuse unlikely, but the safe pattern is already used 100 lines away in the same file; the glue versions should be converted. (The second spot is in dead code — flagged so nobody resurrects it.)

### Theme 6: Duplicates, dead weight, and clutter

**ARCH-001 + the dead-code inventory (MEDIUM overall) — About 40% of the files do nothing.**
The project carries: a whole folder tree of database queries that belong to *sibling* projects (all 62 of them unused here), 19 abandoned helper scripts (a first count of ~30 was wrong — see the correction note below), and about 15 dead code modules — several of which would *crash* if anyone tried to use them (they call functions that were deleted long ago, or reference folders that don't exist). There's also an archive of old database setup files, one of which is corrupted mid-file. None of this affects daily operation, but it makes the project look far bigger and scarier than it is (the truly live database-query surface is just 13 files), hides real problems (two of the dead scripts are where the leftover passwords live — SEC-008), and invites someone to "fix" the wrong copy of something. Recommendation: delete in a few reviewable batches.

> **Correction (2026-09-01).** The first version of this audit over-counted the dead scripts and listed ~15 that are actually **in use by roughly 90 machines**. Deleting them would have taken those machines dark. The count has been re-derived directly from the live database and is now: 67 script files, 37 in use by the database, 18 referenced by code, **19 genuinely dead** — those 19 have been removed. Any future deletion must re-run that same database check first. One consequence: the script with the worst connection-identity problem (SEC-005) turned out to be **in use**, so it must be repaired rather than deleted.

**REF-001 / REF-002 (MEDIUM) — The duplication has already caused real bugs.**
The two transfer modules are near-identical twins that have drifted apart — that's exactly how BUG-004 happened (a safety net added to one twin, not the other) and how BUG-003 happened (the retry contract understood differently on each side). Merging the twins and making the retry hand-off explicit prevents the *next* bug of this kind. Similar smaller cases: a job runner copy-pasted into the demo module, and ~15 GE transfer scripts that differ only in one connection setting (the project already has a good example of how to share that — the Philips MRI script library).

### Theme 7: Housekeeping traps waiting for someone

**DX-001 (MEDIUM) — A hidden load-bearing package.**
The code uses a software package called `uuid` in 8 places but never *declares* that it needs it — it works today only because another (completely unused) package happens to drag `uuid` in with it. If anyone tidies up the unused packages — a normal, reasonable thing to do — the whole application breaks. Five declared packages are genuinely unused and one of them is this accidental load-bearer. The fix is one deliberate command that removes the five and properly declares `uuid`.

**DX-002 (MEDIUM) — The emergency restore file would restore the wrong past.**
The file that tells an operator how to reinstall the job schedule contains instructions from *before* the August hardening. Following its own printed instructions today would quietly undo three applications' improvements and schedule a job from a folder that no longer exists. (The *live* schedule itself is perfect and matches its documentation exactly — this is only about the backup/restore file.) It should be regenerated from the live schedule.

**DX-003 (MEDIUM) — The front-page README describes the old world.**
The README still explains how the system worked before the August modernization. A newcomer following it would do everything wrong. The engineer-facing guide (CLAUDE.md) is accurate and excellent — the README should just point there.

**DX-008 (MEDIUM) — Software versions aren't pinned down.**
The system says "use the latest long-term-support version" of its runtime in four places, which means a future version jump changes the ground under every job with no code change. Meanwhile one admin script secretly *depends* on an ancient version (because of the obsolete scrambling method from SEC-001) with no comment saying so — a well-meaning "let's update this" would break it mysteriously. Pin the versions; retire the old-version script along with SEC-001.

**DX-011 (MEDIUM) — Releasing while jobs are running.**
The release process wipes and rewrites the live folder without checking whether a scheduled job is running *from* that folder at that moment. With jobs firing every few minutes, a release at the wrong moment races them. A "wait until quiet" check before the wipe fixes it.

**DX-004 (LOW)** — The "ignore these files" list for version control ignores some files that are actually essential (they're only tracked because they were added before the rule). Works today; silently blocks adding similar new files tomorrow.

**Plus a set of LOW items** (details in the technical document): mislabeled log entries that say "GE" on Philips and Siemens events; a wrong-order safety grade when a bad schedule number is typed (reads as "partial success" instead of "operator error"); a one-line path typo that makes a Philips CV "have we already got this?" check always answer "no" — causing a pointless re-download and re-unzip of one file per machine every half hour (BUG-010 — the fix is deleting one word); the project is internally named "data-processor" which is not its name; and assorted small correctness nits.

### Theme 8: No safety net

**TEST-001..005 — There are no automated tests at all.** No tests, no code-style checking, no automated verification of any kind (the environment pre-flight check is good, but it checks the *server*, not the *code*). The most valuable additions, in order: (1) a test that replays each "retry note" through the retry job — this would have caught BUG-003 the day it was written; (2) tests for the notepad read/write/erase ordering (BUG-001/002/007); (3) turning the error-dictionary checks that were done by hand in August into a permanent test; (4) an automatic checker for the 40 shell scripts (it would flag nearly every quoting and password-handling issue found here); (5) a small test locking in the run report-card grading that the dashboards depend on.

---

## What's in good shape (no action needed)

- **The run-and-report machinery** — every run grades itself honestly, handles being killed mid-run gracefully, and refuses to claim success when its own record-keeping failed. This is genuinely well engineered.
- **The release process** — the workshop-to-live pipeline has real guardrails: it refuses to ship uncommitted work, stamps every release with an identifier that shows up in every run's records, and the pre-flight check tests the environment the same way the app actually uses it.
- **The schedule and its documentation match exactly** — verified line by line.
- **The error-classification dictionary** — the system's list of "what does this failure message mean" is thoughtfully ordered, documented, and actively maintained.
- **The password-masking discipline in normal logging** — the leak in SEC-002 is via error messages only; the deliberate masking everywhere else is consistent and correct.
- **CLAUDE.md (the engineer's guide)** — accurate on every claim tested.

---

## Suggested order of work

**Phase 1 — This week (each item is a small, independent change):**
change and scrub the exposed password (SEC-001); stop passwords reaching command lines and error logs (SEC-002/003/004); add the two "give up after 10 seconds" settings (DB-001, BUG-005); reverse the erase-then-write order on the notepads (BUG-001); fix the Philips retry hand-off and make the list-draining safe (BUG-003, BUG-002); un-hide the VPN address book job's failures (BUG-006); rotate and delete the leftover passwords in dead scripts (SEC-008).

**Phase 2 — Reliability:**
merge the twin transfer modules, bringing the missing time limit with it (BUG-004/REF-001); honest reporting for the althea job and the garbled-entry case (BUG-008, BUG-007); the smaller robustness fixes (BUG-009/012/015/017, BUG-014's counter semantics); write the first automated tests *alongside* these fixes; regenerate the schedule restore file (DX-002). If/when the owner wants real VPN resets back: the four readiness items from Theme 4.

**Phase 3 — Simplification:**
consolidate to one database connector (DB-002 in the technical doc); make the retry hand-off contract explicit; de-duplicate the demo job runner and the GE script family; convert the two glue-built queries to the safe pattern; snapshot the real database schema into the project.

**Phase 4 — Efficiency:**
the one-word fix that stops the pointless re-downloads (BUG-010); reuse one notepad connection per run instead of opening hundreds; consider a cap on how many machines are contacted simultaneously if the fleet grows.

**Phase 5 — Spring-cleaning:**
delete the dead 40% (in reviewable batches, after Phase 2's tests exist); the one-command dependency fix (DX-001 — do this *before* anyone else tidies packages); update the README; pin the software versions; fix the ignore-list, the project name, and the documentation nits.

Nothing in this plan needs downtime beyond the normal release process, and Phase 1's items can each ship and be verified one at a time.

---

## Quick-reference table

| ID | Severity | In one sentence |
|---|---|---|
| SEC-001 | CRITICAL | A real equipment password is written in the code, on a personal GitHub account — change it and scrub the history. |
| SEC-002 | HIGH | Failed pickups copy passwords into logs and the database via error messages. |
| SEC-003 | HIGH | An admin job prints the whole password list to the screen/logs. |
| BUG-001 | HIGH | Status results are erased before they're safely stored — a hiccup loses them forever. |
| BUG-002 | HIGH | The retry list's wipe-everything habit destroys entries added mid-run (and any backlog past ~1,000). |
| BUG-003 | HIGH | Philips MRI retries always fail — wrong script, wrong instructions. |
| BUG-004 | HIGH | One transfer type has no time limit; one hung machine silently freezes its whole schedule group. |
| BUG-005 | HIGH | If Redis is down, every job freezes forever instead of reporting an error. |
| BUG-006 | HIGH | The VPN address-book job reports success even when it completely fails. |
| DB-001 | HIGH | One database connector never gives up waiting — hung runs, silently skipped schedules. |
| BUG-021 | HIGH | Two machines report healthy while collecting nothing — failed every run for 13+ days, dashboard shows green. |
| BUG-022 | HIGH | A third machine dark while showing green — stuck at an unanswered security prompt, reports success. |
| BUG-007 | MEDIUM | One garbled notepad entry destroys the whole batch. |
| BUG-008 | MEDIUM | The althea pickup reports "success" with an old timestamp when it actually failed. |
| BUG-009 | MEDIUM | The retry job erases its list before it's ready — an early failure loses everything queued. |
| BUG-010 | MEDIUM | A one-word path typo causes a pointless re-download per machine every half hour. |
| BUG-012 | MEDIUM | A logging mistake crashes the error reporter and hides the real failure (Philips MRI local sorting). |
| BUG-013 | MEDIUM | One job fires database updates without waiting or checking they landed. |
| BUG-014 | MEDIUM | The "daily" reset counter never resets, and some counts are silently dropped. |
| BUG-015 | MEDIUM | A machine with missing settings crashes the run instead of being skipped, and the failure isn't attributed to it. |
| BUG-017 | MEDIUM | An unwritable log folder crashes the program before anything is recorded. |
| DB-002 | MEDIUM | Two database connectors where one would do; one quietly falls back to the *wrong database* if settings are missing. |
| DB-003 | MEDIUM | The database blueprints in the project no longer match the real database. |
| SEC-004 | MEDIUM | Passwords are readable in the running-programs list during transfers. |
| SEC-005 | MEDIUM | Some connections skip the "is this really the right machine?" identity check. |
| SEC-006 | MEDIUM | The VPN controller connection skips certificate checking while sending a password. |
| SEC-007 | MEDIUM | An error path could print the VPN admin password into logs. |
| SEC-008 | MEDIUM | Old passwords sit inside three abandoned-but-shipped scripts — rotate and delete. |
| SEC-009 | MEDIUM | One query glues remote machines' text into database commands instead of using the safe pattern. |
| DX-001 | MEDIUM | A hidden load-bearing package: normal package tidying would break the whole app. |
| DX-002 | MEDIUM | The schedule restore file would reinstall the pre-hardening past and a job pointing at a deleted folder. |
| DX-003 | MEDIUM | The README describes the old system; newcomers following it would do everything wrong. |
| DX-008 | MEDIUM | Software versions unpinned in four places; one script secretly needs an ancient version, unexplained. |
| DX-011 | MEDIUM | Releases can wipe the live folder while a job is running from it. |
| ARCH-001 | MEDIUM | ~40% of files are dead weight (including sibling projects' material), hiding the small real system inside. |
| REF-001/002 | MEDIUM | Twin modules that drifted apart — already the root cause of two HIGH bugs; merge them. |
| BUG-011/016/018/019/020 | LOW | Small correctness gaps (details in the technical doc). |
| SEC-010 | LOW | A risky query-building pattern in dead code — delete before someone revives it. |
| DB-004 | LOW | Two tables lack duplicate-prevention rules the code assumes. |
| PERF-002/003 | LOW | Hundreds of unnecessary reconnections per cycle; no cap on simultaneous machine contacts. |
| REF-003..006 | LOW | Fragile positional hand-offs and copy-paste that's worth consolidating when convenient. |
| TEST-001..005 | — | No automated tests exist; the first one to write is the retry-replay test that would have caught BUG-003. |
| DX-004..010 | LOW | Assorted housekeeping: misleading labels, wrong project name, ignore-list traps, stale docs and branches. |

*Deliberately not filed as problems:* the switched-off VPN reset (owner decision — see Theme 4 for re-enablement readiness), and several items already known and tracked in the team's own BACKLOG.md (the unreachable-machines inventory question, the leftover environment-variable switches, log-pruning gaps).
