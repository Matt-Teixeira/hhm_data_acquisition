const { log } = require("../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue } = require("../redis");
const { update_last_dir_date } = require("../redis");

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

  if (!args[0]) {
    await log("error", jobId, sme, "exec_hhm_data_grab_2", "FN CALL", {
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
  const dir_path = `${data_store_path}/${manufacturer}/${modality}/${sme}`;
  args.push(dir_path);

  console.log("\nBash Args");
  console.log(args);

  try {
    const { stdout, stderr } = await execFile(execPath, args);

    console.log("\n********* stdout *********");
    console.log(stdout);

    console.log("\n********* stderr *********");
    console.log(stderr);
    console.log("\n********* stderr *********\n");

    const ssh_test_re = /Connection timed out/;
    if (ssh_test_re.test(stderr)) {
      // args[0] is IP Address
      await add_to_redis_queue(args[0]);
      return;
    }

    //await update_last_dir_date(sme, dir_path);

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

    const ssh_test_re = /Connection timed out/;
    console.log(error.message);
    console.log(ssh_test_re.test(error.message));
    if (ssh_test_re.test(error.message)) {
      // args[0] is IP Address
      await add_to_redis_queue(args[0]);
    }
  }
};

module.exports = exec_hhm_data_grab_2;

// Example of ssh tunnel reset example
// ssh: connect to host 167.171.115.90 port 22: Connection timed out
