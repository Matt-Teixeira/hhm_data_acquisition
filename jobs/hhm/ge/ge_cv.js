const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { get_hhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../../utils/logger/enums");

async function get_ge_cv_data(run_log, capture_datetime) {
  await addLogEvent(I, run_log, "get_ge_cv_data", cal, null, null);

  const manufacturer = "GE";
  const modality = "CV/IR";
  const systems = await get_hhm([manufacturer, modality]);
  const credentials = await getHhmCreds([manufacturer, modality]);

  const child_processes = [];
  for (const system of systems) {
    let note = {
      system
    };
    try {
      await addLogEvent(I, run_log, "get_ge_cv_data", det, note, null);
      if (system.host_ip && system.credentials_group) {
        const cv_path = `./read/sh/GE/${system.acquisition_script}`;

        const system_creds = credentials.find((credential) => {
          if (credential.id == system.credentials_group) return true;
        });

        const user = decryptString(system_creds.user_enc);
        const pass = decryptString(system_creds.password_enc);

        child_processes.push(
          async () =>
            await exec_hhm_data_grab(
              run_log,
              system.id,
              cv_path,
              system,
              [system.host_ip, user, pass],
              capture_datetime
            )
        );
      }
    } catch (error) {
      await addLogEvent(E, run_log, "get_ge_cv_data", cat, note, error);
    }
  }
  try {
    // CREATE AN ARRAY OF PROMISES BY CALLING EACH child_process FUNCTION
    const promises = child_processes.map((child_process) => child_process());

    // AWAIT PROMISIS
    await Promise.all(promises);
  } catch (error) {
    addLogEvent(E, run_log, "get_ge_cv_data", cat, null, error);
  }
}

module.exports = get_ge_cv_data;
