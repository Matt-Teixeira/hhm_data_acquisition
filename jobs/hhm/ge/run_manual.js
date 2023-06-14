const { error } = require("winston");
const { log } = require("../../../logger");
const exec_hhm_data_grab = require("../../../read/exec-hhm_data_grab");
const exec_hhm_data_grab_2 = require("../../../read/exec-hhm_data_grab_2");
const { getHhmCreds, getAllSystem } = require("../../../sql/qf-provider");
const { decryptString } = require("../../../utils");

async function run_system_manual(systemArray, man_mod) {
  try {
    const credentials = await getHhmCreds(man_mod);

    console.log(credentials);

    for (const sys of systemArray) {
      const system = await getAllSystem(sys);
      console.log(system[0]);
      console.log(system[0].hhm_config.data_acquisition.script);

      let user = "";
      let pass = "";
      for (const cred of credentials) {
        if (
          system[0].hhm_config.data_acquisition.hhm_credentials_group == cred.id
        ) {
          user = decryptString(cred.user_enc);
          pass = decryptString(cred.password_enc);
        }
      }

      if ((man_mod[0] !== "Siemens" && user === "") || pass === "") {
        throw new Error("NO CREDENTIALS FOUND");
      }

      const path = `./read/sh/${man_mod[0]}/${system[0].hhm_config.data_acquisition.script}`;
      console.log("path");
      console.log(path);

      exec_hhm_data_grab_2(
        "JOBID",
        system[0].id,
        path,
        man_mod[0],
        man_mod[1],
        [system[0].ip_address, user, pass]
      );
    }
  } catch (error) {
    console.log("HELLO ERROR In CATCH");
  }
}

module.exports = run_system_manual;
/* 
Example hhm_config
{
  "file_path": "/opt/files/SME14520/hhm", 
  "modality": "CT", 
  "log_rotation": "v_2", "run_group": 1, 
  "data_acquisition": {"script": "ge_ct_data_grab.sh", "hhm_credentials_group": "1"}
}
 */
