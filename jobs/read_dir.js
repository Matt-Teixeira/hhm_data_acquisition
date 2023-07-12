const fsp = require("node:fs").promises;

const read_dir = async (path) => {
  const files_in_dir = await fsp.readdir(path);

  console.log(files_in_dir);
};

read_dir(
  "/home/matt-teixeira/hep3/hhm_data_acquisition/files"
);
