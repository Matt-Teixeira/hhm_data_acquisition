const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../util");

async function get_philips_mri_data(run_id) {
  try {
    await log("info", run_id, "Philips_MRI", "get_philips_mri_data", "FN CALL");
    const manufacturer = "Philips";
    const modality = "MRI";
    const systems = await getGeCtHhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    const runable_systems = [];
    for (const system of systems) {
      // REMOVE THIS CONDITION. USED TO SKIP OVER SYSTEMS WITHOUT AN ACQUISITION CONFIG
      if (system.data_acquisition && system.ip_address) {
        const mri_path = `./read/sh/philips/${system.data_acquisition.script}`;

        runable_systems.push(system);
        const system_creds = credentials.find((credential) => {
          if (credential.id == system.data_acquisition.hhm_credentials_group)
            return true;
        });

        const user = decryptString(system_creds.user_enc);
        const pass = decryptString(system_creds.password_enc);

        exec_hhm_data_grab(
          run_id,
          system.id,
          mri_path,
          manufacturer,
          modality,
          system,
          [system.ip_address, user, pass]
        );
      }
    }

  } catch (error) {
    console.log(error);
    await log(
      "error",
      run_id,
      "Philips_MRI",
      "get_philips_mri_data",
      "FN CALL",
      {
        error,
      }
    );
  }
}

module.exports = get_philips_mri_data;
