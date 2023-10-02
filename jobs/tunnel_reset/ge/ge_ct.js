const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_ge_ct_data(run_log, system, capture_datetime, ip_reset) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_ge_ct_data", cal, note, null);

    const manufacturer = "GE";
    const modality = "CT";
    const credentials = await getHhmCreds([manufacturer, modality]);

    if (system.host_ip && system.credentials_group) {
      const ct_path = `./read/sh/GE/${system.acquisition_script}`;

      const system_creds = credentials.find((credential) => {
        if (credential.id == system.credentials_group)
          return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      await exec_hhm_data_grab(
        run_log,
        system.id,
        ct_path,
        system,
        [system.host_ip, user, pass],
        capture_datetime,
        ip_reset
      );
    }
  } catch (error) {
    console.log(error);
    note["txt"] = "Error";
    addLogEvent(E, run_log, "get_ge_ct_data", cat, note, error);
  }
}

module.exports = get_ge_ct_data;
