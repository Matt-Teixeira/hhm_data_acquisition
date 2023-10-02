const { QueryFile } = require("pg-promise");
const { join: joinPath } = require("path");

// HELPER FOR LINKING TO EXTERNAL QUERY FILES
const sql = (file) => {
  const fullPath = joinPath(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
};

module.exports = {
  boot: {
    getSystemsConfigs: sql("boot/get-systems-configs.sql"),
  },
  boot_schedules: {
    get_configs_by_scheduel: sql("boot/get-system-by-schedule.sql"),
  },
  boot_mag_schedules: {
    get_configs_by_scheduel: sql("boot/get-mag-by-schedule.sql"),
  },
  boot_edu_schedules: {
    get_configs_by_scheduel: sql("boot/get-edu-by-schedule.sql"),
  },
};
