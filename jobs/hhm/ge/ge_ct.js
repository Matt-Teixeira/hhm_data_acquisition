const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
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

async function get_ge_ct_data(run_log) {
  await addLogEvent(I, run_log, "get_ge_ct_data", cal, null, null);

  const manufacturer = "GE";
  const modality = "CT";
  const systems = await getGeCtHhm([manufacturer, modality]);
  const credentials = await getHhmCreds([manufacturer, modality]);

  for (const system of systems) {
    let note = {
      system,
    };
    try {
      await addLogEvent(I, run_log, "get_ge_ct_data", det, note, null);
      if (system.data_acquisition && system.ip_address) {
        const ct_path = `./read/sh/GE/${system.data_acquisition.script}`;

        const system_creds = credentials.find((credential) => {
          if (credential.id == system.data_acquisition.hhm_credentials_group)
            return true;
        });

        const user = decryptString(system_creds.user_enc);
        const pass = decryptString(system_creds.password_enc);

        exec_hhm_data_grab(
          run_log,
          system.id,
          ct_path,
          manufacturer,
          modality,
          system,
          [system.ip_address, user, pass]
        );
      }
    } catch (error) {
      await addLogEvent(E, run_log, "get_ge_ct_data", cat, note, error);
      await writeLogEvents(run_log);
    }
  }
}

module.exports = get_ge_ct_data;
