const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const reset_tunnel = require("../jobs/tunnel_reset");
const { delay } = require("../utils");

const exec_hhm_data_grab = async (
  jobId,
  sme,
  execPath,
  manufacturer,
  modality,
  args
) => {
  await log("info", jobId, args[3], "exec_hhm_data_grab", "FN CALL", {
    execPath: execPath,
    args: args,
  });

  let data_store_path = "";
  switch (process.env.RUN_ENV) {
    case "dev":
      data_store_path = process.env.DEV_HHM_FILES;
      break;
    case "staging":
      data_store_path = process.env.STAGING_HHM_FILES;
      break;
    case "prod":
      data_store_path = process.env.PROD_HHM_FILES;
      break;
    default:
      break;
  }

  // EXAMPLE: /home/prod/hhm_data_acquisition/files/prod_hhm/GE/CT/SME00001
  args[3] = `${data_store_path}/${manufacturer}/${modality}/${args[3]}`;

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    console.log("\nSTDOUT\n");
    console.log(stdout);
    console.log("\nSTDERR\n");
    console.log(stderr);

    if (stdout.trim() == "22_failed") {
      await log("warn", jobId, args[3], "exec_hhm_data_grab", "FN DETAILS", {
        message: "Port 22 is not open",
        args,
      });
    }

    if (stdout.trim() == "21_failed") {
      await log("warn", jobId, args[3], "exec_hhm_data_grab", "FN DETAILS", {
        message: "Ports 21 & 22 are not open",
        args,
      });
      const tunnel_was_reset = await reset_tunnel(jobId, sme, args[0]);
      console.log("\ntunnel_was_reset");
      console.log(tunnel_was_reset);
      console.log("\n");
      if (tunnel_was_reset) {
        await log("info", jobId, args[3], "exec_hhm_data_grab", "FN DETAILS", {
          message: "Tunnel was successfully reset",
          tunnel_was_reset,
        });
        console.log("\nRUNNING execFile() within setTimeout()");
        console.log(execPath, args);
        // Introduce delay between tunnel reset and retry of data pull
        await delay(2000);
        await execFile(execPath, args);
      } else {
        await log("error", jobId, args[3], "exec_hhm_data_grab", "FN DETAILS", {
          message: "Tunnel was not reset",
          tunnel_was_reset,
        });
      }
    }

    return;
  } catch (error) {
    console.log(error);
    await log("error", jobId, args[3], "exec_hhm_data_grab", "FN CATCH", {
      error: error,
      args,
    });
    return null;
  }
};

module.exports = exec_hhm_data_grab;
