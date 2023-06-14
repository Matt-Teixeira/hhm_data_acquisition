const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const add_to_redis_queue = require("../redis/ip_queue");

const exec_hhm_data_grab_2 = async (
  jobId,
  sme,
  execPath,
  manufacturer,
  modality,
  args
) => {
  await log("info", jobId, sme, "exec_hhm_data_grab_2", "FN CALL", {
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
  args.push(`${data_store_path}/${manufacturer}/${modality}/${sme}`);

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    console.log("\n********* stdout *********");
    console.log(stdout);

    console.log("\n********* stderr *********");
    console.log(stderr);

    return;
  } catch (error) {
    console.log("\n***** ERROR START: exec_hhm_data_grab_2 *****\n");
    console.log(error);
    console.log("\n***** ERROR END: exec_hhm_data_grab_2 *****\n");
    console.log(error.stderr);
    await log("error", jobId, sme, "exec_hhm_data_grab_2", "FN CATCH", {
      error: error,
      args,
      sme,
    });
    // args[0] is IP Address
    await add_to_redis_queue(args[0]);
  }
};

module.exports = exec_hhm_data_grab_2;

// Example of ssh tunnel reset example
// ssh: connect to host 167.171.115.90 port 22: Connection timed out