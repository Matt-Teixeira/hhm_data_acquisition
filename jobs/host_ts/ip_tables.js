const exec_ip_tables = require("../../read/exec-ip_table");

const set_22 = () => {
  try {
    const std = exec_ip_tables();
  } catch (error) {
    console.log(error);
  }
};

set_22();

