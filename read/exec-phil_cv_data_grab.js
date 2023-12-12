const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const {
  add_to_redis_queue,
  add_to_online_queue,
  update_last_dir_date,
} = require("../redis");
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../utils/logger/enums");

const exec_phil_cv_data_grab = async (
  run_log,
  sme,
  execPath,
  system,
  args,
  type,
  capture_datetime,
  ip_reset = false
) => {
  let note = {
    system_id: system.id,
    execute_path: execPath,
    args,
  };
  await addLogEvent(I, run_log, "exec_phil_cv_data_grab", cal, note, null);

  const connection_test_1 = /Connection timed out/;
  const connection_test_2 = /error: max-retries exceeded/;

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

    let note = {
      system_id: system.id,
      stdout,
      stderr,
    };

    await addLogEvent(I, run_log, "exec_phil_cv_data_grab", det, note, null);

    // If connection is closed, return false
    if (connection_test_1.test(stderr) || connection_test_2.test(stderr)) {
      let note = {
        system_id: system.id,
        stdout,
        stderr,
      };

      await addLogEvent(E, run_log, "exec_phil_cv_data_grab", det, note, null);

      // Only runs for ip reset instance
      // Reason: In initial data pull, if connection issue occurs, just send to ip:queue and make second attempt.
      // If connection issue occurs on second attempt (ip reset job), place in online:queue to then place in heartbeat table
      if (ip_reset) {
        await add_to_online_queue(run_log, {
          id: system.id,
          capture_datetime,
          successful_acquisition: false,
          data_source: "hhm"
        });

        return false;
      }

      system.data_source = "hhm";
      await add_to_redis_queue(run_log, system);
      return false;
    }

    await update_last_dir_date(sme, args[3], type);
    await add_to_online_queue(run_log, {
      id: system.id,
      capture_datetime,
      successful_acquisition: true,
      data_source: "hhm"
    });

    return stdout;
  } catch (error) {
    console.log(error);

    if (
      connection_test_1.test(error.message) ||
      connection_test_2.test(error.message)
    ) {
      let note = {
        system_id: system.id,
      };

      await addLogEvent(E, run_log, "exec_phil_cv_data_grab", cat, note, error);

      if (ip_reset) {
        await add_to_online_queue(run_log, {
          id: system.id,
          capture_datetime,
          successful_acquisition: false,
          data_source: "hhm"
        });

        return false;
      }

      system.data_source = "hhm";
      await add_to_redis_queue(run_log, system);

      return false;
    }
    await addLogEvent(E, run_log, "exec_phil_cv_data_grab", cat, note, error);
    return null;
  }
};

module.exports = exec_phil_cv_data_grab;

// Example of ssh tunnel reset example
// ssh: connect to host 167.171.115.90 port 22: Connection timed out
