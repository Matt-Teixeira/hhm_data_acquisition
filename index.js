("use strict");
require("dotenv").config();
const { log } = require("./logger");
const rsync_philips_mri = require("./jobs/rsync_philips-mri");
const short = require("short-uuid");
const onBootMMB = require("./mmb");

const onBoot = async () => {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });

  try {
    console.time("RUN TIME");

    rsync_philips_mri();

    //await onBootMMB();

    console.timeEnd("RUN TIME");
  } catch (error) {
    await log("error", "JobID", "NA", "onBoot", `ON ERROR`, {
      error: error,
    });
  }
};
onBoot();
