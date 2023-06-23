const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm } = require("../../../sql/qf-provider");
const [
  addLogEvent,
  writeLogEvents,
  dbInsertLogEvents,
  makeAppRunLog,
] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_mri_data(run_log) {
  await addLogEvent(I, run_log, "get_siemens_mri_data", cal, null, null);

  const manufacturer = "Siemens";
  const modality = "MRI";
  const systems = await getGeCtHhm([manufacturer, modality]);

  for await (const system of systems) {
    let note = {
      system,
    };
    try {
      await addLogEvent(I, run_log, "get_siemens_mri_data", det, note, null);
      if (system.data_acquisition && system.ip_address) {
        const mri_path = `./read/sh/siemens/${system.data_acquisition.script}`;

        exec_hhm_data_grab(
          run_log,
          system.id,
          mri_path,
          manufacturer,
          modality,
          system,
          [system.ip_address]
        );
      }
    } catch (error) {
      await addLogEvent(E, run_log, "get_siemens_mri_data", cat, note, error);
      await writeLogEvents(run_log);
    }
  }
}

module.exports = get_siemens_mri_data;
