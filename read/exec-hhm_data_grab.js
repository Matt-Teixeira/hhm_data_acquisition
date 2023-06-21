const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue } = require("../redis");

const exec_hhm_data_grab = async (
  jobId,
  sme,
  execPath,
  manufacturer,
  modality,
  system,
  args
) => {
  const connection_test_1 = /Connection timed out/;
  const connection_test_2 = /error: max-retries exceeded/;

  await log("info", jobId, sme, "exec_hhm_data_grab", "FN CALL", {
    execPath: execPath,
    args: args,
    sme,
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
  // DEV: args.push(`${data_store_path}/${manufacturer}/${modality}/${sme}`);
  args.push(`${data_store_path}/${sme}`);

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    // If connection is closed, return false
    if (connection_test_1.test(stderr) || connection_test_2.test(stderr)) {
      await add_to_redis_queue(JSON.stringify(system));
      return false;
    }

    return stdout;
  } catch (error) {
    console.log(error);
    await log("error", jobId, sme, "exec_hhm_data_grab", "FN CATCH", {
      error: error,
      args,
      sme,
    });
    if (
      connection_test_1.test(error.message) ||
      connection_test_2.test(error.message)
    ) {
      await add_to_redis_queue(JSON.stringify(system));
      return false;
    }
    return null;
  }
};

module.exports = exec_hhm_data_grab;
