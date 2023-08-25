const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_cv_data(
  run_log,
  system,
  capture_datetime,
  ip_reset
) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_siemens_cv_data", cal, note, null);

    if (system.data_acquisition && system.ip_address) {
      const cv_path = `./read/sh/Siemens/${system.data_acquisition.script}`;

      await exec_hhm_data_grab(
        run_log,
        system.id,
        cv_path,
        system,
        [system.ip_address],
        capture_datetime,
        ip_reset
      );
    }
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_siemens_cv_data", cat, note, error);
  }
}

module.exports = get_siemens_cv_data;
