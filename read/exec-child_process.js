const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_child_process = async (jobId, sme, path, args) => {
  // THIS FUNCTION SYNCS A REMOTE FILE TO A LOCAL MIRROR AND RETURNS THE NEWLY SYNCED FILE SIZE
  await log("info", jobId, sme, "exec_child_process", "FN CALL", {
    path: path,
    args: args,
  });

  console.log(args);

  try {
    const { stdout } = await execFile(path, args);

    //const fileSizeAfterRsync = parseInt(stdout);
    await log("info", jobId, sme, "exec_child_process", "FN DETAILS", {
      //fileSizeAfterRsync: fileSizeAfterRsync,
    });
    return stdout;
  } catch (err) {
    console.log(err);
    await log("error", jobId, sme, "exec_child_process", "FN CATCH", {
      error: err,
    });
    return null;
  }
};

module.exports = exec_child_process;
