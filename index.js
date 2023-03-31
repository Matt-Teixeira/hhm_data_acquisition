("use strict");
require("dotenv").config();
const { log } = require("./logger");
const rsync_philips_mri = require("./jobs/rsync_philips-mri");
const crypto = require("crypto");

const onBoot = async () => {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });
  let jobId = crypto.randomUUID();

  try {
    console.time("RUN TIME");

    await rsync_philips_mri(jobId);

    console.timeEnd("RUN TIME");
  } catch (error) {
    await log("error", jobId, "NA", "redisClient", `ON ERROR`, {
      error: error,
    });
  }
};
onBoot();
