const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_hhm_data_grab = async (jobId, sme, execPath, args) => {
  await log("info", jobId, sme, "exec_hhm_data_grab", "FN CALL", {
    execPath: execPath,
    args: args,
  });

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    console.log("\nSTDOUT\n");
    console.log(stdout);
    console.log("\nSTDERR\n");
    console.log(stderr);

    if (stdout.trim() == '22_failed') {
      await log("error", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Port 22 is not open"
      });
    }
    if (stdout.trim() == '21_failed') {
      await log("error", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Ports 21 & 22 are not open"
      });
    }

    return;
  } catch (error) {
    console.log(error);
    await log("error", jobId, sme, "exec_hhm_data_grab", "FN CATCH", {
      error: error,
    });
    return null;
  }
};

module.exports = exec_hhm_data_grab;
