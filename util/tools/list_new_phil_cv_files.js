const exec_list_dirs = require("../../read/exec-list_dirs");

async function list_new_files(sme, ip_address, last_file, user, pass, system) {
  const file_re = /daily_\d{4}_\d{2}_\d{2}|daily_\d{4}\d{2}\d{2}/;
  const list_path = "./read/sh/Philips/phil_cv_file_list.sh";
  const files_list = await exec_list_dirs("jobID", sme, list_path, system, [
    ip_address,
    user,
    pass,
    `${process.env.DEV_HHM_FILES}/Philips/CV/${sme}`,
  ]);

  if (files_list === false) return false;

  const dirs = files_list.split(" ");
  if (!dirs) return null;

  // Runs if block if no Redis reference - returns last (newest) valid dir for this system
  if (!last_file) {
    let last_file = "";
    for (let i = dirs.length - 1; i > 0; i--) {
      const matching_file = file_re.test(dirs[i]);
      if (matching_file) {
        last_file = dirs[i];
        last_file = last_file.trim();
        break;
      }
    }
    console.log("Last Dir");
    console.log(last_file);
    return [last_file];
  }

  const last_file_index = dirs.indexOf(last_file);

  let reduced_files = dirs.slice(last_file_index + 1, dirs.length - 1);
  console.log(reduced_files);

  const last_files = reduced_files.filter((file) => file.match(file_re));

  if (!last_files.length) return null;
  return last_files;
}

module.exports = list_new_files;
