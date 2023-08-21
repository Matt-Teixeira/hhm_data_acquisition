const exec_hhm_data_grab = require("../../../read/post_tunnel_reset/exec-hhm_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_philips_ct_data(run_log, system) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_philips_ct_data", cal, note, null);

    const manufacturer = "Philips";
    const modality = "CT";
    const credentials = await getHhmCreds([manufacturer, modality]);

    if (system.data_acquisition && system.ip_address) {
      const ct_path = `./read/sh/Philips/${system.data_acquisition.script}`;

      const system_creds = credentials.find((credential) => {
        if (credential.id == system.data_acquisition.hhm_credentials_group)
          return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      await exec_hhm_data_grab(run_log, system.id, ct_path, system, [
        system.ip_address,
        user,
        pass,
      ]);
    }
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_philips_ct_data", cat, note, error);
  }
}

module.exports = get_philips_ct_data;
