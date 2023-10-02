const exec_phil_cv_data_grab = require("../../../read/exec-phil_cv_data_grab");
const { getHhmCreds } = require("../../../sql/qf-provider");
const { decryptString, list_new_files } = require("../../../util");
const { get_last_dir_date } = require("../../../redis/redis_helpers");
const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../../utils/logger/enums");

async function get_philips_cv_data(
  run_log,
  system,
  capture_datetime,
  ip_reset
) {
  let note = { system: system };
  try {
    addLogEvent(I, run_log, "get_philips_cv_data", cal, note, null);
    const manufacturer = "Philips";
    const modality = "CV/IR";
    const credentials = await getHhmCreds([manufacturer, modality]); // Change modality in hhm_credentials table to CV/IR

    const cv_path = `./read/sh/Philips/${system.acquisition_script}`;

    const system_creds = credentials.find((credential) => {
      if (credential.id == system.credentials_group) return true;
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
      let note = {
        system_id: system.id,
        message: "No new files"
      };
      addLogEvent(I, run_log, "get_philips_cv_data", cal, note, null);
      return;
    }
    if (new_files === false) {
      console.log("System needs tunnel reset: " + system.id);
      return;
    }

    for (const file of new_files) {
      await exec_phil_cv_data_grab(
        run_log,
        system.id,
        cv_path,
        system,
        [system.host_ip, user, pass, file],
        capture_datetime,
        ip_reset
      );
    }
  } catch (error) {
    console.log(error);
    addLogEvent(E, run_log, "get_philips_cv_data", cat, note, error);
  }
}

module.exports = get_philips_cv_data;
