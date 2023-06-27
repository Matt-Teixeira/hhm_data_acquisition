const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../utils/logger/enums");

const exec_remote_rsync = async (run_log, sme, rsyncShPath, rsyncShArgs) => {
  let note = {
    system_id: sme,
    rsync_path: rsyncShPath,
    args: rsyncShArgs,
  };
  try {
    addLogEvent(I, run_log, "exec_remote_rsync", cal, note, null);
    const { stdout } = await execFile(rsyncShPath, rsyncShArgs);

    return;
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "exec_remote_rsync", cat, note, error);
    return null;
  }
};

module.exports = exec_remote_rsync;
