const exec_child_process = require("../../read/exec-child_process");

async function list_new_files(sme, ip_address, last_file, user, pass) {
  const list_path = "./read/sh/Philips/phil_cv_file_list.sh";
  const files_list = await exec_child_process("jobID", sme, list_path, [
    ip_address,
    user,
    pass,
    `${process.env.DEV_HHM_FILES}/Philips/CV/${sme}`,
  ]);
  const dirs = files_list.split(" ");
  console.log(dirs);
  const last_file_index = dirs.indexOf(last_file);

  let reduced_files = dirs.slice(last_file_index + 1, dirs.length - 1);
  console.log(reduced_files);

  const last_files = reduced_files.filter((file) =>
    file.match(/daily_\d{4}_\d{2}_\d{2}/)
  );

  console.log(last_files);
  return last_files;
}

module.exports = list_new_files;
