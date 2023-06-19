const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue } = require("../redis");

const exec_list_dirs = async (jobId, sme, path, args) => {
  const connection_test_1 = /Connection timed out/;
  const connection_test_2 = /error: max-retries exceeded/;

  await log("info", jobId, sme, "exec_list_dirs", "FN CALL", {
    path: path,
    args: args,
  });

  console.log(args);

  try {
    const { stdout, stderr } = await execFile(path, args);

    console.log("****** stdout ******");
    console.log(stdout);
    console.log("******stderr******");
    console.log(stderr);

    // If connection is closed, return false
    if (connection_test_1.test(stderr) || connection_test_2.test(stderr)) {
      // args[0] is IP Address
      await add_to_redis_queue(args[0]);
      return false;
    }

    return stdout;
  } catch (error) {
    console.log(error);
    await log("error", jobId, sme, "exec_list_dirs", "FN CATCH", {
      error: error,
    });

    if (
      connection_test_1.test(error.message) ||
      connection_test_2.test(error.message)
    ) {
      // args[0] is IP Address
      await add_to_redis_queue(args[0]);
      return false;
    }
    return null;
  }
};

module.exports = exec_list_dirs;
