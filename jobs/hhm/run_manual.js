const { error } = require("winston");
const { log } = require("../../logger");
const exec_hhm_data_grab = require("../../read/exec-hhm_data_grab");
const exec_phil_cv_data_grab = require("../../read/exec-phil_cv_data_grab");
const exec_child_process = require("../../read/exec-child_process");
const { getHhmCreds, getAllSystem } = require("../../sql/qf-provider");
const {
  decryptString,
  phil_ct_file_date_formatter,
  list_new_files,
} = require("../../util");

async function run_system_manual(systemArray, man_mod) {
  try {
    const credentials = await getHhmCreds(man_mod);

    for (const sys of systemArray) {
      const system = await getAllSystem(sys);
      if (!system[0].hhm_config) {
        console.log("NO CONFIG!! " + system[0].id);
        return;
      }

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

      const new_files = await list_new_files(
        system[0].id,
        system[0].ip_address,
        "daily_2023_06_16",
        user,
        pass
      );

      console.log(system[0].hhm_config.data_acquisition);

      /* let formatted_date = "";
      if (man_mod[0] === "Philips" && man_mod[1] === "CV") {
        formatted_date = phil_ct_file_date_formatter(
          system[0].hhm_config.data_acquisition.date_format
        );
      } */

      for (const file of new_files) {
        exec_phil_cv_data_grab(
          "JOBID",
          system[0].id,
          path,
          man_mod[0],
          man_mod[1],
          [system[0].ip_address, user, pass, file]
        );
      }
    }
  } catch (error) {
    console.log("HELLO ERROR In CATCH");
    console.log(error);
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
