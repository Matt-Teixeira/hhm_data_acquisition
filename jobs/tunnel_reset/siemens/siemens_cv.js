const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../../utils/logger/enums");

async function get_siemens_cv_data(
  job_id,
  run_log,
  system,
  capture_datetime,
  ip_reset
) {
  let note = { job_id, system: system };
  try {
    addLogEvent(I, run_log, "get_siemens_cv_data", cal, note, null);

    const cv_path = `./read/sh/Siemens/${system.acquisition_script}`;

    await exec_hhm_data_grab(
      job_id,
      run_log,
      system.id,
      cv_path,
      system,
      [system.host_ip],
      capture_datetime,
      ip_reset
    );
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_siemens_cv_data", cat, note, error);
  }
}

module.exports = get_siemens_cv_data;
