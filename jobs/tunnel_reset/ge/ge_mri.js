const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_ge_mri_data(run_log, system) {
  try {
    let note = { system: system };
    addLogEvent(I, run_log, "get_ge_ct_data", cal, note, null);
    const manufacturer = "GE";
    const modality = "MRI";
    const credentials = await getHhmCreds([manufacturer, modality]);

    const mri_path = `./read/sh/GE/${system.data_acquisition.script}`;
    if (system.data_acquisition && system.ip_address) {
      const system_creds = credentials.find((credential) => {
        if (credential.id == system.data_acquisition.hhm_credentials_group)
          return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      await exec_hhm_data_grab(run_log, system.id, mri_path, system, [
        system.ip_address,
        user,
        pass,
      ]);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = get_ge_mri_data;
