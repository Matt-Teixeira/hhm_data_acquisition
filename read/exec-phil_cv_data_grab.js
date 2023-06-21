const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue, update_last_dir_date } = require("../redis");

const exec_phil_cv_data_grab = async (
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

  await log("info", jobId, sme, "exec_phil_cv_data_grab", "FN CALL", {
    execPath: execPath,
    args: args,
    sme,
  });

  if (!args[0]) {
    await log("error", jobId, sme, "exec_phil_cv_data_grab", "FN CALL", {
      execPath: execPath,
      ip: args[0],
      sme,
      error: "No IP address",
    });
    console.log("ERROR: No IP address!!! " + args[0]);
    return;
  }

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

    console.log("\n********* stdout *********");
    console.log(stdout);

    console.log("\n********* stderr *********");
    console.log(stderr);
    console.log("\n********* stderr *********\n");

    // If connection is closed, return false
    if (connection_test_1.test(stderr) || connection_test_2.test(stderr)) {
      // args[0] is IP Address
      await add_to_redis_queue(JSON.stringify(system));
      return false;
    }

    await update_last_dir_date(sme, args[3]);

    return;
  } catch (error) {
    console.log("\n***** ERROR START: exec_phil_cv_data_grab *****\n");
    console.log(error);
    console.log("\n***** ERROR END: exec_phil_cv_data_grab *****\n");
    console.log(error.stderr);
    await log("error", jobId, sme, "exec_phil_cv_data_grab", "FN CATCH", {
      error: error,
      args,
      sme,
    });

    if (
      connection_test_1.test(error.message) ||
      connection_test_2.test(error.message)
    ) {
      // args[0] is IP Address
      await add_to_redis_queue(JSON.stringify(system));
      return false;
    }
    return null;
  }
};

module.exports = exec_phil_cv_data_grab;

// Example of ssh tunnel reset example
// ssh: connect to host 167.171.115.90 port 22: Connection timed out
