const { log } = require("../../../logger");

const getMachineConfigs = async (rows) => {
  await log("info", "NA", "getMachineConfigs", "FN CALL", null);

  try {
    const machine_configs = [];
    const missing_config = [];
    for (const row of rows) {
      // QA - SKIP SYSTEMS MISSING REQUIRED CONFIG
      if (!row.config) {
        missing_config.push(row.id);
        continue;
      }


      const { schedule, file_name, pg_tables, regex_models } = row.config;
      machine_configs.push({
        sme: row.id,
        schedule: schedule,
        mmbScript: file_name,
        pgTable: pg_tables[0],
        regexModels: regex_models,
        ip_address: row.mmb_ip,
        user_id: row.user_id
      });
    }

    await log("info", "NA", "getMachineConfigs", "FN CALL", {
      machine_configs: machine_configs,
      missing_config: missing_config
    });

    return machine_configs;
  } catch (error) {
    console.log(error);
    throw new Error(`getMachineConfigs FN CATCH -> ${error.message}`, {
      cause: error
    });
  }
};

module.exports = getMachineConfigs;
