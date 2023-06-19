const { error } = require("winston");
const { log } = require("../../logger");
const exec_hhm_data_grab = require("../../read/exec-hhm_data_grab");
const exec_phil_cv_data_grab = require("../../read/exec-phil_cv_data_grab");
const exec_child_process = require("../../read/exec-list_dirs");
const { getHhmCreds, getAllSystem } = require("../../sql/qf-provider");
const {
  decryptString,
  phil_ct_file_date_formatter,
  list_new_files,
} = require("../../util");
const { get_last_dir_date } = require("../../redis/redis_helpers");

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

      // { START: Philips CV Specific Code

      // Get last dir from Redis
      const last_aquired_dir = await get_last_dir_date(system[0].id);
      console.log("last_aquired_dir");
      console.log(last_aquired_dir);
      // Example: daily_2023_06_19 or daily_20230619

      // Pass last_aquired_dir to list new files post last_aquired_dir
      const new_files = await list_new_files(
        system[0].id,
        system[0].ip_address,
        last_aquired_dir,
        user,
        pass
      );

      if (new_files === null) {
        //LOG
        console.log("No new files for: " + system[0].id);
        return;
      }
      if (new_files === false) {
        console.log("System needs tunnel reset: " + system[0].id);
        return;
      }
      // { END: Philips CV Specific Code

      // Remove last (file) arg if not running Philips CV
      for (let file of new_files) {
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
    console.log("ERROR IN MANUAL CATCH");
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
