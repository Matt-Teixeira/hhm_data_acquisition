const { QueryFile } = require("pg-promise");
const { join: joinPath } = require("path");

// HELPER FOR LINKING TO EXTERNAL QUERY FILES
const sql = (file) => {
  const fullPath = joinPath(__dirname, file); // GENERATING FULL PATH;
  return new QueryFile(fullPath, { minify: true });
};

module.exports = {
  system_ip: {
    ipAddress: sql("system/ip-address.sql"),
  },
  system_data: {
    smeNumber: sql("system/system-data.sql"),
  },
  pg_table: {
    smeNumber: sql("system/getPgTable.sql"),
  },
  update_date_time: {
    dateTime: sql("system/updateDateTime.sql"),
  },
};
