("use strict");
require("dotenv").config();
const short = require("short-uuid");
const { log } = require("./logger");
const rsync_philips_mri = require("./jobs/philips_mri/rsync_philips-mri");
const onBootMMB = require("./jobs/mmb");
const get_hhm_data = require("./jobs/hhm");
const run_system_manual = require("./jobs/hhm/ge/run_manual");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("./logger/enums");
const [addLogEvent, writeLogEvents] = require("./logger/log");

function runJob(run_id, run_group, schedule, manufacturer, modality) {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    run_group,
    schedule,
  });
  let note = {
    run_group: run_group,
    schedule: schedule,
    modality: modality,
  };

  addLogEvent(I, run_id, "onBoot", det, note, null);
  writeLogEvents();
  switch (run_group) {
    case "mmb":
      onBootMMB(parseInt(run_id, schedule));
      break;
    case "philips":
      rsync_philips_mri(run_id);
      break;
    case "hhm":
      get_hhm_data(run_id, manufacturer, modality);
      break;

    default:
      break;
  }
}

const onBoot = async () => {
  const run_id = short.uuid();
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });

  let note = {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  };

  addLogEvent(I, run_id, "onBoot", det, note, null);

  try {
    //rsync_philips_mri();
    const run_group = process.argv[2];
    const schedule = process.argv[3] || null;
    const manufacturer = process.argv[4] || null;
    const modality = process.argv[5] || null;

    console.log(run_group, schedule, manufacturer, modality);

    runJob(run_id, run_group, schedule, manufacturer, modality);
  } catch (error) {
    console.log(error);
    await log("error", "JobID", "NA", "onBoot", `ON ERROR`, {
      error: error,
    });
  }
};
//onBoot();

run_system_manual(["SME14520"], ["GE", "CT"], 0);
