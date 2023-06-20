const { log } = require("../../../logger");
const exec_phil_cv_data_grab = require("../../../read/exec-phil_cv_data_grab");
const { getGeCtHhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString, list_new_files } = require("../../../util");
const { get_last_dir_date } = require("../../../redis/redis_helpers");

async function get_philips_cv_data(run_id) {
  try {
    await log("info", run_id, "Philips_CV", "get_philips_cv_data", "FN CALL");
    const manufacturer = "Philips";
    const modality = "CV/IR";
    const systems = await getGeCtHhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, "CV"]); // Change modality in hhm_credentials table to CV/IR

    console.log(systems);

    for (const system of systems) {
      run_phil_cv(system, credentials, manufacturer);
    }
  } catch (error) {
    console.log(error);
    await log("error", run_id, "Philips_CV", "get_philips_cv_data", "FN CALL", {
      error,
    });
  }
}

async function run_phil_cv(system, credentials, manufacturer) {
  if (system.data_acquisition && system.ip_address) {
    const cv_path = `./read/sh/Philips/${system.data_acquisition.script}`;

    const system_creds = credentials.find((credential) => {
      if (credential.id == system.data_acquisition.hhm_credentials_group)
        return true;
    });

    const user = decryptString(system_creds.user_enc);
    const pass = decryptString(system_creds.password_enc);

    const last_aquired_dir = await get_last_dir_date(system.id);
    // Example: daily_2023_06_19 or daily_20230619

    // Pass last_aquired_dir to list new files post last_aquired_dir
    const new_files = await list_new_files(
      system.id,
      system.ip_address,
      last_aquired_dir,
      user,
      pass,
      system
    );

    if (new_files === null) {
      //LOG
      console.log("No new files for: " + system.id);
      return;
    }
    if (new_files === false) {
      console.log("System needs tunnel reset: " + system.id);
      return;
    }

    for (const file of new_files) {
      exec_phil_cv_data_grab(
        "JOBID",
        system.id,
        cv_path,
        manufacturer,
        "CV",
        system,
        [system.ip_address, user, pass, file]
      );
    }
  }
}

module.exports = get_philips_cv_data;

/* 
{
  id: 'SME02552',
  ip_address: '172.16.112.240',
  data_acquisition: { script: 'phil_cv_21.sh', hhm_credentials_group: '12' },
  manufacturer: 'Philips',
  modality: 'CV/IR'
}
*/
