const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { get_hhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");

const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../../utils/logger/enums");

async function get_siemens_cv_data(run_log, capture_datetime) {
  console.log("SIEMENS_CV/IR");

  try {
    const manufacturer = "Siemens";
    const modality = "CV/IR";
    const systems = await get_hhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    console.log(systems);

    for (const system of systems) {
      let note = {
        system
      };
      const system_creds = credentials.find((credential) => {
        if (credential.id == system.credentials_group) return true;
      });
      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);
  
      try {
        if (system.acquisition_script && system.host_ip) {
          const cv_path = `./read/sh/Siemens/${system.acquisition_script}`;

          await exec_hhm_data_grab(
            run_log,
            system.id,
            cv_path,
            system,
            [system.host_ip, user, pass, system.host_path],
            capture_datetime
          )
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
