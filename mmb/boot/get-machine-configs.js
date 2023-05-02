const { log } = require("../../logger");

const getMachineConfigs = async (rows) => {
  await log("info", "NA", "getMachineConfigs", "FN CALL", null);

  try {
    const machine_configs = [];
    const missing_config = [];
    for (const row of rows) {
      // QA - SKIP SYSTEMS MISSING REQUIRED CONFIG
      if (!row.mmb_config) {
        missing_config.push(row.id);
        continue;
      }
      const {
        id: sme, // RE-ASSIGN NAME
        mmb_config: { rpp_configs, ssh }, // NESTED DESTRUCTURE
      } = row;
      for (const config of rpp_configs) {
        const { schedule, mmbScript, pgTable, regexModels } = config;
        machine_configs.push({
          sme: sme,
          schedule: schedule,
          mmbScript: mmbScript,
          pgTable: pgTable,
          regexModels: regexModels,
          ip_address: ssh.ip_address,
          user_id: ssh.user_id
        });
      }
    }

    console.log(machine_configs)

    await log("info", "NA", "getMachineConfigs", "FN CALL", {
      machine_configs: machine_configs,
      missing_config: missing_config,
    });

    return machine_configs;
  } catch (error) {
    throw new Error(`getMachineConfigs FN CATCH -> ${error.message}`, {
      cause: error,
    });
  }
};

module.exports = getMachineConfigs;
