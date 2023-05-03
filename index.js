("use strict");
require("dotenv").config();
const { log } = require("./logger");
const rsync_philips_mri = require("./jobs/rsync_philips-mri");
const onBootMMB = require("./mmb");

function runJob(run_group, schedule) {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    run_group,
    schedule,
  });
  switch (run_group) {
    case "mmb":
      onBootMMB(parseInt(schedule));
      break;
    case "philips":
      rsync_philips_mri();
      break;

    default:
      break;
  }
}

const onBoot = async () => {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });

  try {
    console.time("RUN TIME");

    //rsync_philips_mri();
    const run_group = process.argv[2];
    const schedule = process.argv[3] || null;

    runJob(run_group, schedule);

    console.timeEnd("RUN TIME");
  } catch (error) {
    await log("error", "JobID", "NA", "onBoot", `ON ERROR`, {
      error: error,
    });
  }
};
onBoot();
