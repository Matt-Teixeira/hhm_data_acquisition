const db = require("../../../db/pgPool");
const { log } = require("../../../logger");
const {
  boot,
  boot_schedules,
  boot_mag_schedules,
  boot_edu_schedules
} = require("./sql");

// GENERIC LOGGER FOR ANY QF CALL
const logQf = async (fn, qfArgs) => {
  await log("info", "NA", fn, `FN CALL`, {
    qfArgs: qfArgs
  });
};

const getOnBootData = async () => {
  await logQf("getOnBootData", null);

  try {
    return Promise.all([db.any(boot.getSystemsConfigs)]);
  } catch (error) {
    console.log(error);
    // TODO: I'M NOT SURE THIS CAN EVEN BE CALLED
    // CHECK VIA USING PG_DB = dev_ml
    throw new Error(`getOnBootData FN CATCH -> ${error.message}`, {
      cause: error
    });
  }
};

const get_systems_by_schedule = async (schedule) => {
  console.log(schedule);
  return db.any(boot_schedules.get_configs_by_scheduel, schedule);
};

const get_systems_by_mag_schedule = async (schedule) => {
  console.log(schedule);
  return db.any(boot_mag_schedules.get_configs_by_scheduel, schedule);
};

const get_systems_by_edu_schedule = async (schedule) => {
  console.log(schedule);
  return db.any(boot_edu_schedules.get_configs_by_scheduel, schedule);
};

module.exports = {
  getOnBootData,
  get_systems_by_schedule,
  get_systems_by_mag_schedule,
  get_systems_by_edu_schedule
};
