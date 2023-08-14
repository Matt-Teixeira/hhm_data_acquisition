const exec_phil_cv_data_grab = require("../../../read/exec-phil_cv_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString, list_new_files } = require("../../../util");
const { get_last_dir_date } = require("../../../redis/redis_helpers");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

async function get_philips_cv_data(run_log, system) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_philips_cv_data", cal, note, null);
    const manufacturer = "Philips";
    const modality = "CV/IR";
    const credentials = await getHhmCreds([manufacturer, modality]); // Change modality in hhm_credentials table to CV/IR

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
        run_log,
        system.id,
        system.ip_address,
        last_aquired_dir,
        user,
        pass,
        system
      );

      if (new_files === null) {
        //LOG
        let note = {
          system_id: system.id,
          message: "No new files",
        };
        addLogEvent(I, run_log, "get_philips_cv_data", cal, note, null);
        return;
      }
      if (new_files === false) {
        console.log("System needs tunnel reset: " + system.id);
        return;
      }

      for (const file of new_files) {
        await exec_phil_cv_data_grab(run_log, system.id, cv_path, system, [
          system.ip_address,
          user,
          pass,
          file,
        ]);
      }
    }
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_philips_cv_data", cat, note, error);
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
