("use strict");
require("dotenv").config();
const { log } = require("./logger");
const rsync_philips_mri = require("./jobs/philips_mri/rsync_philips-mri");
const onBootMMB = require("./jobs/mmb");
const get_hhm_data = require("./jobs/hhm");
const run_system_manual = require("./jobs/hhm/run_manual");
const [
  addLogEvent,
  writeLogEvents,
  dbInsertLogEvents,
  makeAppRunLog,
] = require("./utils/logger/log");

const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("./utils/logger/enums");

function runJob(run_log, run_group, schedule, manufacturer, modality) {
  log("info", "NA", "NA", "onBoot", `FN CALL`, {
    run_group,
    schedule,
  });
  let note = {
    run_group: run_group,
    schedule: schedule,
    modality: modality,
  };

  addLogEvent(I, run_log, "onBoot", det, note, null);
  
  switch (run_group) {
    case "mmb":
      onBootMMB(parseInt(run_log, schedule));
      break;
    case "philips":
      rsync_philips_mri(run_log);
      break;
    case "hhm":
      get_hhm_data(run_log, manufacturer, modality);
      break;

    default:
      break;
  }
  //writeLogEvents(run_log);
}

const onBoot = async () => {
  const run_log = await makeAppRunLog();

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

  addLogEvent(I, run_log, "onBoot", cal, note, null);

  try {
    const run_group = process.argv[2];
    const schedule = process.argv[3] || null;
    const manufacturer = process.argv[4] || null;
    const modality = process.argv[5] || null;

    console.log(run_group, schedule, manufacturer, modality);

    // Supply one or more SMEs in first arg array, but must be same manufac. & modality
    if (run_group === "manual") {
      run_system_manual(["SME00785"], ["Philips", "CV"]);
    }

    runJob(run_log, run_group, schedule, manufacturer, modality);
  } catch (error) {
    console.log(error);
    await log("error", "JobID", "NA", "onBoot", `ON ERROR`, {
      error: error,
    });
  }
};

onBoot();
