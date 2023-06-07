const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function get_ge_mri_data(run_id) {
  try {
    await log("info", run_id, "SYSTEM", "get_ge_mri_data", "FN CALL");
    const manufacturer = "GE";
    const modality = "MRI";
    const systems = await getGeCtHhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    console.log("\n*** START: GE MRI SYSTEMS ***");
    console.log(systems);
    console.log("*** END: GE MRI SYSTEMS ***\n");

    const mri_path = "./read/sh/GE/ge_mri_data_grab.sh";

    for (const system of systems) {
      console.log(system);
      await log("info", run_id, system.id, "get_ge_mri_data", "FN CALL", {
        exec_path: mri_path,
      });

      // REMOVE THIS CONDITION. USED TO SKIP OVER SYSTEMS WITHOUT AN ACQUISITION CONFIG
      if (system.data_acquisition && system.ip_address) {
        const system_creds = credentials.find((credential) => {
          if (credential.id == system.data_acquisition.hhm_credentials_group)
            return true;
        });

        const user = decryptString(system_creds.user_enc);
        const pass = decryptString(system_creds.password_enc);

        exec_hhm_data_grab(run_id, system.id, ct_path, manufacturer, modality, [
          system.ip_address,
          user,
          pass,
          system.id,
        ]);
      }
    }
  } catch (error) {
    console.log(error);
    await log("error", run_id, "SYSTEM", "get_ge_mri_data", "FN CALL", {
      error,
    });
  }
}

module.exports = get_ge_mri_data;
