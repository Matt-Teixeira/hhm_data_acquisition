const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_ge_ct_data(run_log, system) {
  try {
    let note = { system: system };
    addLogEvent(I, run_log, "get_ge_ct_data", cal, note, null);

    const manufacturer = "GE";
    const modality = "CT";
    const credentials = await getHhmCreds([manufacturer, modality]);

    // REMOVE THIS CONDITION. USED TO SKIP OVER SYSTEMS WITHOUT AN ACQUISITION CONFIG
    if (system.data_acquisition && system.ip_address) {
      const ct_path = `./read/sh/GE/${system.data_acquisition.script}`;

      const system_creds = credentials.find((credential) => {
        if (credential.id == system.data_acquisition.hhm_credentials_group)
          return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      exec_hhm_data_grab("PLACEHOLDER run_job", system.id, ct_path, manufacturer, modality, system, [
        system.ip_address,
        user,
        pass,
      ]);
    }
  } catch (error) {
    console.log(error);
    note["txt"] = "Error";
    addLogEvent(E, run_log, "get_ge_ct_data", cat, note, error);
  }
}

module.exports = get_ge_ct_data;
