const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_mri_data(run_log, system) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_siemens_mri_data", cal, note, null);

    if (system.data_acquisition && system.ip_address) {
      const mri_path = `./read/sh/Siemens/${system.data_acquisition.script}`;

      await exec_hhm_data_grab(run_log, system.id, mri_path, system, [
        system.ip_address,
      ]);
    }
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_siemens_mri_data", cat, note, error);
  }
}

module.exports = get_siemens_mri_data;
