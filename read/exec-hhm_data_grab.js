const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_hhm_data_grab = async (jobId, sme, execPath, args) => {
  await log("info", jobId, sme, "exec_hhm_data_grab", "FN CALL", {
    execPath: execPath,
    args: args,
  });

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    console.log(stdout);

    if (stdout.trim() == '22_failed') {
      await log("error", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Port 22 is not open"
      });
    }
    if (stdout.trim() == '21_failed') {
      await log("error", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Port 21 is not open"
      });
    }

    return;
  } catch (error) {
    console.log(error);
    await log("erroror", jobId, sme, "exec_hhm_data_grab", "FN CATCH", {
      error: error,
    });
    return null;
  }
};

module.exports = exec_hhm_data_grab;
