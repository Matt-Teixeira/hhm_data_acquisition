const exec_list_dirs = require("../../read/exec-list_dirs");
const [addLogEvent] = require("../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../../utils/logger/enums");

async function list_new_phil_cv_files(
  run_log,
  sme,
  ip_address,
  previous_daily_file,
  previous_lod_file,
  user,
  pass,
  system,
  capture_datetime,
  ip_reset = false
) {
  const daily_files_to_pull = await list_new_daily_files(
    run_log,
    sme,
    ip_address,
    previous_daily_file,
    user,
    pass,
    system,
    capture_datetime,
    ip_reset
  );

  const lod_files_to_pull = await list_new_lod_files(
    run_log,
    sme,
    ip_address,
    previous_lod_file,
    user,
    pass,
    system,
    capture_datetime,
    ip_reset
  );

  return { daily_files_to_pull, lod_files_to_pull };
}

async function list_new_daily_files(
  run_log,
  sme,
  ip_address,
  previous_daily_file,
  user,
  pass,
  system,
  capture_datetime,
  ip_reset
) {
  const daily_re = /daily_\d{4}_\d{2}_\d{2}|daily_\d{4}\d{2}\d{2}/;
  const list_path = "./read/sh/Philips/phil_cv_file_list.sh";
  const files_list = await exec_list_dirs(
    run_log,
    sme,
    list_path,
    system,
    [ip_address, user, pass, `${process.env.DEV_HHM_FILES}/Philips/CV/${sme}`],
    capture_datetime,
    ip_reset
  );

  if (files_list === false) return null;

  const dirs = files_list.split(" ");
  if (!dirs) return null;

  // Runs if block if no Redis reference - returns last (newest) valid dir for this system
  if (!previous_daily_file) {
    let last_file = "";
    for (let i = dirs.length - 1; i > 0; i--) {
      const matching_file = daily_re.test(dirs[i]);
      if (matching_file) {
        last_file = dirs[i];
        last_file = last_file.trim();
        break;
      }
    }
    return [last_file];
  }

  // BEGIN: identifying daily directory to pull
  const last_file_index = dirs.indexOf(previous_daily_file);

  let reduced_files = dirs.slice(last_file_index + 1, dirs.length - 1);

  const last_files = reduced_files.filter(file => file.match(daily_re));

  // END: identifying daily directory to pull

  // BEGIN: determin wether or not to pull lod file

  // END: determin wether or not to pull lod file

  if (!last_files.length) return null;
  return last_files;
}

async function list_new_lod_files(
  run_log,
  sme,
  ip_address,
  previous_lod_file,
  user,
  pass,
  system,
  capture_datetime,
  ip_reset
) {
  const list_path = "./read/sh/Philips/phil_cv_file_list.sh";
  const lod_re = /lod.*/;

  const files_list = await exec_list_dirs(
    run_log,
    sme,
    list_path,
    system,
    [ip_address, user, pass, `${process.env.DEV_HHM_FILES}/Philips/CV/${sme}`],
    capture_datetime,
    ip_reset
  );

  if (files_list === false) return null;

  const dirs = files_list.split(" ");
  if (!dirs) return null;

  // Runs if block if no Redis reference - returns last (newest) valid dir for this system
  if (!previous_lod_file) {
    let last_file = "";
    for (let i = dirs.length - 1; i > 0; i--) {
      const matching_file = lod_re.test(dirs[i]);
      if (matching_file) {
        last_file = dirs[i];
        last_file = last_file.trim();
        break;
      }
    }

    // account for no lod dir
    if (last_file === "") return null;

    return [last_file];
  }

  // Group lod directories

  const lod_dirs = [];

  for (let i = dirs.length - 1; i > 0; i--) {
    const matching_file = lod_re.test(dirs[i]);
    if (matching_file) {
      lod_dirs.push(dirs[i]);
    }
  }

  let prev_lod_index = lod_dirs.indexOf(previous_lod_file);

  if (prev_lod_index < 0) {
    let note = {
      message: "Previous lod file not found",
      previous_lod_file
    };
    await addLogEvent(I, run_log, "list_new_lod_files", det, note, null);
    return null;
  }

  const new_lod_files = lod_dirs.slice(prev_lod_index + 1);

  if (!new_lod_files.length) return null;

  return new_lod_files;
}

module.exports = list_new_phil_cv_files;
