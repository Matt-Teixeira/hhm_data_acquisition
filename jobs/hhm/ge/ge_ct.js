const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function get_ge_ct_data(run_id) {
  try {
    await log("info", run_id, "GE_CV", "get_ge_ct_data", "FN CALL");
    const manufacturer = "GE";
    const modality = "CT";
    const systems = await getGeCtHhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    for (const system of systems) {
      console.log(system);
      const ct_path = "./read/sh/GE/ge_ct_data_grab.sh";

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
    await log("error", run_id, "GE_CT", "get_ge_ct_data", "FN CALL", {
      error,
    });
  }
}

module.exports = get_ge_ct_data;
