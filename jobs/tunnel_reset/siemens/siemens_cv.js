const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_cv_data(run_log, system) {
  try {
    let note = { system: system };
    addLogEvent(I, run_log, "get_siemens_cv_data", cal, note, null);

    const manufacturer = "Siemens";
    const modality = "CV/IR";

    // REMOVE THIS CONDITION. USED TO SKIP OVER SYSTEMS WITHOUT AN ACQUISITION CONFIG
    if (system.data_acquisition && system.ip_address) {
      const cv_path = `./read/sh/siemens/${system.data_acquisition.script}`;

      exec_hhm_data_grab(
        "PLACEHOLDER run_log",
        system.id,
        cv_path,
        manufacturer,
        system,
        "CV",
        [system.ip_address]
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_siemens_cv_data;
