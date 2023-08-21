const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const {
  add_to_redis_queue,
  add_to_online_queue,
  update_last_dir_date,
} = require("../../redis");
const [addLogEvent] = require("../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../utils/logger/enums");

const exec_phil_cv_data_grab = async (run_log, sme, execPath, system, args) => {
  let note = {
    system_id: system.id,
    execute_path: execPath,
    args,
  };
  await addLogEvent(I, run_log, "exec_phil_cv_data_grab", cal, note, null);

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

    await update_last_dir_date(sme, args[3]);

    return stdout;
  } catch (error) {
    console.log(error);

    await addLogEvent(E, run_log, "exec_phil_cv_data_grab", cat, note, error);
    return null;
  }
};

module.exports = exec_phil_cv_data_grab;
