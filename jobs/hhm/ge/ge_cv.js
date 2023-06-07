const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function get_ge_cv_data(run_id) {
  try {
    await log("info", run_id, "GE_CV", "get_ge_cv_data", "FN CALL");
    const manufacturer = "GE";
    const modality = "CV";
    const systems = await getGeCtHhm([manufacturer, "CV/IR"]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    const cv_path = "./read/sh/ge_cv_data_grab.sh";

    for await (const system of systems) {
      await log("info", run_id, system.id, "get_ge_cv_data", "FN CALL", {
        exec_path: cv_path,
      });

      console.log(system.id + "\n");

      const system_creds = credentials.find((credential) => {
        if (credential.id == system.credential_id) return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      exec_hhm_data_grab(run_id, system.id, cv_path, manufacturer, modality, [
        system.ip_address,
        user,
        pass,
        system.id,
      ]);
    }
  } catch (error) {
    console.log(error);
    await log("error", run_id, "GE_CV", "get_ge_cv_data", "FN CALL", {
      error,
    });
  }
}

module.exports = get_ge_cv_data;
