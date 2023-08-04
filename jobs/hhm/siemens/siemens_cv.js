const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { get_hhm } = require("../../../sql/qf-provider");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_cv_data(run_log) {
  try {
    const manufacturer = "Siemens";
    const modality = "CV/IR";
    const systems = await get_hhm([manufacturer, modality]);

    for (const system of systems) {
      let note = {
        system,
      };
      try {
        if (system.data_acquisition && system.ip_address) {
          const cv_path = `./read/sh/Siemens/${system.data_acquisition.script}`;

          exec_hhm_data_grab(run_log, system.id, cv_path, system, [
            system.ip_address,
          ]);
        }
      } catch (error) {
        await addLogEvent(E, run_log, "get_siemens_ct_data", cat, note, error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_siemens_cv_data;
