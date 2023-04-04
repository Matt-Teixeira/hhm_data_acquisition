const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_local_rsync = async (jobId, sme, rsyncShPath, rsyncShArgs) => {
  // THIS FUNCTION SYNCS A REMOTE FILE TO A LOCAL MIRROR AND RETURNS THE NEWLY SYNCED FILE SIZE
  await log("info", jobId, sme, "exec_local_rsync", "FN CALL", {
    rsyncShPath: rsyncShPath,
    rsyncShArgs: rsyncShArgs,
  });

  try {
    const { stdout } = await execFile(rsyncShPath, rsyncShArgs);

    //const fileSizeAfterRsync = parseInt(stdout);
    await log("info", jobId, sme, "exec_local_rsync", "FN DETAILS", {
      //fileSizeAfterRsync: fileSizeAfterRsync,
    });
    return; //fileSizeAfterRsync;
  } catch (err) {
    console.log(err)
    await log("error", jobId, sme, "exec_local_rsync", "FN CATCH", {
      error: err,
    });
    return null;
  }
};

module.exports = exec_local_rsync;
