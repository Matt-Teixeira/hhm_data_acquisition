// Shared log-shape helpers used across data_acquisition jobs and exec wrappers.
// Kept here (not in utils/logger) because they assume this app's data shapes
// and should not leak into the shared logger.

// Return a copy of args with the given indexes replaced by "***". The caller's
// live args array is untouched. Default [1, 2] matches the HHM shell-script
// convention of [host_ip, user, password, ...]; callers with a different
// positional layout (e.g. rsync wrappers with user_id elsewhere) pass their own.
const redactArgsForLog = (args, indexes = [1, 2]) => {
  const copy = Array.isArray(args) ? [...args] : [];
  for (const i of indexes) if (i >= 0 && i < copy.length) copy[i] = "***";
  return copy;
};

// --- Secret scrubbing for ERROR objects (SEC-002) ---------------------------
// redactArgsForLog covers the CALL note only. When execFile REJECTS, node's
// error carries the full command line -- credentials included -- in .message
// and .cmd, repeated in .stack. That object then reaches: the cron .out (via
// console.log), `err_msg` in the run log, util.app_run_logs (verbose_log AND
// the warn_error_logs subset ops-dashboard/incident-engine read), and, through
// the unknown-exception branch's connection_error, alert.offline_*_conn.
//
// Secret POSITIONS are the same ones redactArgsForLog masks -- pass the same
// `indexes` to both so the two helpers can never disagree.

const SECRET_MASK = "***";
// Below this length a "secret" would mask innocuous substrings everywhere and
// destroy the diagnostic value of the message (a 1-char user masks every
// occurrence of that letter). Short values are left alone deliberately.
const MIN_SECRET_LEN = 3;

const secretsFromArgs = (args, indexes = [1, 2]) => {
  if (!Array.isArray(args)) return [];
  const out = [];
  for (const i of indexes) {
    const v = args[i];
    if (typeof v === "string" && v.length >= MIN_SECRET_LEN) out.push(v);
  }
  return out;
};

// Literal (non-regex) replacement: credentials routinely contain regex
// metacharacters, so split/join is the only safe form here.
const scrubSecrets = (text, secrets) => {
  if (typeof text !== "string" || !text) return text;
  if (!Array.isArray(secrets) || !secrets.length) return text;
  let out = text;
  for (const s of secrets) out = out.split(s).join(SECRET_MASK);
  return out;
};

// Returns a PLAIN-OBJECT copy of `err` with every credential-bearing field
// scrubbed, preserving the diagnostic fields the exec wrappers branch on.
// Callers must keep branching on the ORIGINAL error and log only this copy.
const redactError = (err, secrets) => {
  if (!err) return err;
  if (!Array.isArray(secrets) || !secrets.length) return err;

  const safe = {
    message: scrubSecrets(err.message, secrets),
    stack: scrubSecrets(err.stack, secrets),
  };
  // Branch-relevant fields must survive verbatim (index.js/exec wrappers read
  // code === 124 and killed === true to classify timeouts).
  for (const k of ["code", "killed", "signal", "status"]) {
    if (err[k] !== undefined) safe[k] = err[k];
  }
  // execFile attaches the command line and the child's captured streams; all
  // three can echo credentials.
  for (const k of ["cmd", "stdout", "stderr"]) {
    if (err[k] !== undefined) safe[k] = scrubSecrets(String(err[k]), secrets);
  }
  return safe;
};

// Preserve the TAIL of a long stream (errors usually live at the end) and
// prepend a marker saying how many chars were dropped. Shared by the exec
// wrappers so every captured stdout/stderr -- success path or CATCH path --
// is bounded the same way before it lands in util.app_run_logs.
const MAX_STREAM_CHARS = 4096;
const truncateStream = (s) => {
  if (typeof s !== "string" || s.length <= MAX_STREAM_CHARS) return s;
  return `...[truncated ${s.length - MAX_STREAM_CHARS} chars]\n${s.slice(-MAX_STREAM_CHARS)}`;
};

// Compact subset of a `systems`-table row for log notes. The full row is
// ~300 chars and repeats per-system per-event; the subset keeps enough for
// debugging across HHM / MMB / philips_mri row shapes. Unknown columns drop.
const SYSTEM_LOG_FIELDS = [
  "id",
  "host_ip",
  "modality",
  "manufacturer",
  "acquisition_script",
  "vpn",
  "system_id",
  "mmb_ip",
  "user_id",
  "host_path",
];
const systemLogShape = (s) => {
  if (!s || typeof s !== "object") return s;
  const out = {};
  for (const k of SYSTEM_LOG_FIELDS) if (s[k] !== undefined) out[k] = s[k];
  return out;
};

module.exports = {
  redactArgsForLog,
  secretsFromArgs,
  scrubSecrets,
  redactError,
  truncateStream,
  systemLogShape,
};
