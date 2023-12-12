const exec_phil_cv_data_grab = require("../../../read/exec-phil_cv_data_grab");
const { get_hhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString, list_new_phil_cv_files } = require("../../../util");
const { get_previous_dir } = require("../../../redis/redis_helpers");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../../utils/logger/enums");

async function get_philips_cv_data(run_log, capture_datetime) {
  await addLogEvent(I, run_log, "get_philips_cv_data", cal, null, null);
  const child_processes = [];
  try {
    const manufacturer = "Philips";
    const modality = "CV/IR";
    const systems = await get_hhm([manufacturer, modality]);
    const credentials = await getHhmCreds([manufacturer, modality]);

    for (const system of systems) {
      child_processes.push(
        async () =>
          await run_phil_cv(run_log, system, credentials, capture_datetime)
      );
    }
  } catch (error) {
    console.log(error);
  }
  try {
    // CREATE AN ARRAY OF PROMISES BY CALLING EACH child_process FUNCTION
    const promises = child_processes.map(child_process => child_process());

    // AWAIT PROMISIS
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_ge_cv_data", cat, null, error);
  }
}

async function run_phil_cv(run_log, system, credentials, capture_datetime) {
  if (system.host_ip && system.credentials_group) {
    await addLogEvent(I, run_log, "run_phil_cv", cal, null, null);
    const daily_dir_acqu_script = `./read/sh/Philips/${system.acquisition_script}`;
    const lod_dir_acqu_script = `./read/sh/Philips/phil_cv_21_lod.sh`;

    const system_creds = credentials.find(credential => {
      if (credential.id == system.credentials_group) return true;
    });

    const user = decryptString(system_creds.user_enc);
    const pass = decryptString(system_creds.password_enc);

    const last_aquired_dir = await get_previous_dir(
      system.id,
      "last_phil_cv_daily"
    );
    // Example: daily_2023_06_19 or daily_20230619

    const last_lod_file = await get_previous_dir(system.id, "last_phil_cv_lod");
    // Example: lod_20231114_0953

    // Pass last_aquired_dir to list new files post last_aquired_dir
    const {
      daily_files_to_pull,
      lod_files_to_pull
    } = await list_new_phil_cv_files(
      run_log,
      system.id,
      system.host_ip,
      last_aquired_dir,
      last_lod_file,
      user,
      pass,
      system
    );

    console.log("\ndaily_files_to_pull");
    console.log(daily_files_to_pull);

    console.log("\nlod_files_to_pull");
    console.log(lod_files_to_pull);

    if (daily_files_to_pull !== null) {
      for await (const file of daily_files_to_pull) {
        await exec_phil_cv_data_grab(
          run_log,
          system.id,
          daily_dir_acqu_script,
          system,
          [system.host_ip, user, pass, file],
          "last_phil_cv_daily",
          capture_datetime
        );
      }
    }

    if (lod_files_to_pull !== null) {
      for await (const file of lod_files_to_pull) {
        await exec_phil_cv_data_grab(
          run_log,
          system.id,
          lod_dir_acqu_script,
          system,
          [system.host_ip, user, pass, file],
          "last_phil_cv_lod",
          capture_datetime
        );
      }
    }
  }
}

module.exports = { get_philips_cv_data, run_phil_cv };

/* 
{
  id: 'SME02552',
  ip_address: '172.16.112.240',
  data_acquisition: { script: 'phil_cv_21.sh', hhm_credentials_group: '12' },
  manufacturer: 'Philips',
  modality: 'CV/IR'
}
*/
