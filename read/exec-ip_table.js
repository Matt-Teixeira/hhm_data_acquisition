const util = require("util");
const execFile = util.promisify(require("child_process").execFile);

const exec_ip_tables = async () => {
  // 10MB
  const execOptions = {
    maxBuffer: 1024 * 1024 * 10
  };

  let path = "./read/sh/telnet_ip_tables.sh";

  try {
    const { stdout } = await execFile(path);
    console.log(stdout);

    return stdout;
  } catch (error) {
    console.log(error);
  }
};

module.exports = exec_ip_tables;
