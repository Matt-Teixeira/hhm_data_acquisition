const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { get_hhm } = require("../../../sql/qf-provider");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_siemens_ct_data(run_log, capture_datetime) {
  await addLogEvent(I, run_log, "get_siemens_ct_data", cal, null, null);

  const manufacturer = "Siemens";
  const modality = "%CT";
  const systems = await get_hhm([manufacturer, modality]);

  const child_processes = [];
  for (const system of systems) {
    let note = {
      system,
    };

    await addLogEvent(I, run_log, "get_siemens_ct_data", det, note, null);
    if (system.data_acquisition && system.ip_address) {
      const ct_path = `./read/sh/Siemens/${system.data_acquisition.script}`;

      child_processes.push(
        async () =>
          await exec_hhm_data_grab(
            run_log,
            system.id,
            ct_path,
            system,
            [system.ip_address],
            capture_datetime
          )
      );
    }
  }
  try {
    // CREATE AN ARRAY OF PROMISES BY CALLING EACH child_process FUNCTION
    const promises = child_processes.map((child_process) => child_process());

    // AWAIT PROMISIS
    await Promise.all(promises);
  } catch (error) {
    addLogEvent(E, run_log, "get_siemens_ct_data", cat, null, error);
  }
}

module.exports = get_siemens_ct_data;
