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
    smeNumber: sql("system/phil_mri_systems.sql"),
  },
  pg_table: {
    smeNumber: sql("system/getPgTable.sql"),
  },
  update_date_time: {
    dateTime: sql("system/updateDateTime.sql"),
  },
  get_mod_man: {
    smeNumber: sql("system/get_mod_man.sql"),
  },
  get_ge_ct_hhm: {
    systems: sql("system/get_ge_ct_hhm.sql"),
  },
  get_hhm_creds: {
    hhm_credentials: sql("system/hhm_credentials.sql"),
  },
  get_all_system_data: {
    system: sql("system/system_all.sql"),
  },
};
