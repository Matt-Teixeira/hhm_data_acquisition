const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function get_ge_cv_data() {
  try {
    await log("info", "jobId", "GE_CV", "get_ge_cv_data", "FN CALL");
    const systems = await getGeCtHhm(["GE", "CV/IR"]);
    const credentials = await getHhmCreds(["GE", "CV"]);
    console.log(systems);
    console.log(credentials);

    const cv_path = "./read/sh/ge_cv_data_grab.sh";

    for await (const system of systems) {
      await log("info", "jobId", system.id, "get_ge_cv_data", "FN CALL", {
        exec_path: cv_path,
      });

      console.log(system.id + "\n");

      const system_creds = credentials.find((credential) => {
        if (credential.id == system.credential_id) return true;
      });

      const user = decryptString(system_creds.user_enc);
      const pass = decryptString(system_creds.password_enc);

      //jobId, sme, execPath, args
      exec_hhm_data_grab("JOBID", "SME00001", cv_path, [
        system.ip_address,
        user,
        pass,
        system.id,
      ]);
    }
  } catch (error) {
    console.log(error);
    await log("error", "jobId", "GE_CV", "get_ge_cv_data", "FN CALL", {
      error,
    });
  }
}

module.exports = get_ge_cv_data;
