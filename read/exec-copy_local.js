const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../utils/logger/enums");

const exec_local_rsync = async (run_log, sme, rsyncShPath, rsyncShArgs) => {
  let note = {
    system_id: sme,
    rsync_path: rsyncShPath,
    args: rsyncShArgs,
  };
  addLogEvent(I, run_log, "exec_local_rsync", cal, note, null);

  try {
    const { stdout } = await execFile(rsyncShPath, rsyncShArgs);

    return;
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "exec_local_rsync", cat, note, error);
    return null;
  }
};

module.exports = exec_local_rsync;
