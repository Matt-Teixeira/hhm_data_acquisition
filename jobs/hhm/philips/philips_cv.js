const exec_phil_cv_data_grab = require("../../../read/exec-phil_cv_data_grab");
const { get_hhm, getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString, list_new_files } = require("../../../util");
const { get_last_dir_date } = require("../../../redis/redis_helpers");
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
    const promises = child_processes.map((child_process) => child_process());

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
    const cv_path = `./read/sh/Philips/${system.acquisition_script}`;

    const system_creds = credentials.find((credential) => {
      if (credential.id == system.credentials_group)
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
      system.host_ip,
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

    for await (const file of new_files) {
      await exec_phil_cv_data_grab(
        run_log,
        system.id,
        cv_path,
        system,
        [system.host_ip, user, pass, file],
        capture_datetime
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
