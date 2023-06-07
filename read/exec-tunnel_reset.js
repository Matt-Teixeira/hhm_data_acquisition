const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_tunnel_reset = async (jobId, sme, execPath, args) => {
  await log("info", jobId, args[3], "exec_tunnel_reset", "FN CALL", {
    execPath: execPath,
    args: args,
  });

  console.log("\nBash Args");
  console.log(args, sme);

  try {
    const { stdout } = await execFile(execPath, args);

    return stdout;
  } catch (error) {
    console.log(error);
    await log("error", jobId, args[3], "exec_tunnel_reset", "FN CATCH", {
      error: error,
      args
    });
    return null;
  }
};

module.exports = exec_tunnel_reset;
