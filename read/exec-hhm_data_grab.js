const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_hhm_data_grab = async (
  jobId,
  sme,
  execPath,
  manufacturer,
  modality,
  args
) => {
  await log("info", jobId, sme, "exec_hhm_data_grab", "FN CALL", {
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
  args.push(`${data_store_path}/${manufacturer}/${modality}/${sme}`);

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    if (stdout.trim() == "22_failed") {
      await log("warn", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Port 22 is not open",
        args,
      });
    }

    if (stdout.trim() == "21_failed") {
      await log("warn", jobId, sme, "exec_hhm_data_grab", "FN DETAILS", {
        message: "Ports 21 & 22 are not open",
        args,
      });
    }

    return;
  } catch (error) {
    console.log(error);
    await log("error", jobId, sme, "exec_hhm_data_grab", "FN CATCH", {
      error: error,
      args,
    });
    return null;
  }
};

module.exports = exec_hhm_data_grab;
