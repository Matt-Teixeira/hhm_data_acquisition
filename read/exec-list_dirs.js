const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_list_dirs = async (jobId, sme, path, args) => {
  // THIS FUNCTION SYNCS A REMOTE FILE TO A LOCAL MIRROR AND RETURNS THE NEWLY SYNCED FILE SIZE
  await log("info", jobId, sme, "exec_list_dirs", "FN CALL", {
    path: path,
    args: args,
  });

  console.log(args);

  try {
    const { stdout, stderr } = await execFile(path, args);

    //const fileSizeAfterRsync = parseInt(stdout);
    await log("info", jobId, sme, "exec_list_dirs", "FN DETAILS", {
      //fileSizeAfterRsync: fileSizeAfterRsync,
    });
    const connection_test = /Connection timed out/;
    if (connection_test.test(stderr)) {
      // args[0] is IP Address
      await add_to_redis_queue(args[0]);
      return null;
    }

    return stdout;
  } catch (err) {
    console.log(err);
    await log("error", jobId, sme, "exec_list_dirs", "FN CATCH", {
      error: err,
    });
    return null;
  }
};

module.exports = exec_list_dirs;
