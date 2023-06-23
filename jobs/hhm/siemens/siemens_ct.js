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

async function get_siemens_ct_data(run_log) {
  await addLogEvent(I, run_log, "get_siemens_ct_data", cal, null, null);

  const manufacturer = "Siemens";
  const modality = "CT";
  const systems = await getGeCtHhm([manufacturer, modality]);

  for (const system of systems) {
    let note = {
      system,
    };
    try {
      await addLogEvent(I, run_log, "get_siemens_ct_data", det, note, null);
      if (system.data_acquisition && system.ip_address) {
        const ct_path = `./read/sh/siemens/${system.data_acquisition.script}`;

        exec_hhm_data_grab(
          run_log,
          system.id,
          ct_path,
          manufacturer,
          modality,
          system,
          [system.ip_address]
        );
      }
    } catch (error) {
      await addLogEvent(E, run_log, "get_siemens_ct_data", cat, note, error);
      await writeLogEvents(run_log);
    }
  }
}

module.exports = get_siemens_ct_data;
