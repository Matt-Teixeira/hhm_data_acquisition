const db = require("../db/pgPool");
const { log } = require("../logger");
const {
  system_ip,
  system_data,
  pg_table,
  update_date_time,
  get_mod_man,
  get_ge_ct_hhm,
  get_hhm_creds,
  get_all_system_data,
} = require("./sql");

// GENERIC LOGGER FOR ANY QF CALL
const logQf = async (uuid, fn, qfArgs) => {
  await log("info", uuid, "sme", fn, `FN CALL`, {
    qfArgs: qfArgs,
  });
};

const getSystemIpAddress = async (uuid, sme) => {
  await logQf(uuid, "getSystemIpAddress", sme);
  return db.any(system_ip.ipAddress, sme);
};

const get_phil_mri_systems = async () => {
  await logQf("ID", "get_phil_mri_systems", "n/a");
  return await db.any(system_data.smeNumber);
};

const getPgTable = async (uuid, sme) => {
  await logQf(uuid, "getPgTable", sme);
  return db.one(pg_table.smeNumber, sme);
};

const updateDateTime = async (argsArray) => {
  try {
    return db.any(update_date_time.dateTime, argsArray);
  } catch (error) {
    await log("error", uuid, argsArray[2], "updateDateTime", `FN CALL`);
  }
};

const getModMan = async (sme) => {
  try {
    return await db.one(get_mod_man.smeNumber, sme);
  } catch (error) {
    console.log(error);
  }
};

const getGeCtHhm = async (argsArray) => {
  try {
    return db.any(get_ge_ct_hhm.systems, argsArray);
  } catch (error) {
    console.log(error);
    await log("error", "uuid", "sme", "getGeCtHhm", `FN CALL`);
  }
};

const getHhmCreds = async (argsArray) => {
  try {
    return db.any(get_hhm_creds.hhm_credentials, argsArray);
  } catch (error) {
    console.log(error);
    await log("error", "uuid", "sme", "getHhmCreds", `FN CALL`);
  }
};

const getAllSystem = async (argsArray) => {
  try {
    return db.any(get_all_system_data.system, argsArray);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSystemIpAddress,
  get_phil_mri_systems,
  getPgTable,
  updateDateTime,
  getModMan,
  getGeCtHhm,
  getHhmCreds,
  getAllSystem,
};
