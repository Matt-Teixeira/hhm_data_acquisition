("use strict");
require("dotenv").config();
const rsync_philips_mri = require("./jobs/philips_mri/rsync_philips-mri");
const onBootMMB = require("./jobs/mmb");
const get_hhm_data = require("./jobs/hhm");
const run_system_manual = require("./jobs/hhm/run_manual");
const reset_tunnel = require("./jobs/tunnel_reset");
const build_config = require("./jobs/build_config");
const { captureDatetime } = require("./util");
const { insertOfflineTable } = require("./util");
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

async function runJob(run_log, run_group, schedule, manufacturer, modality) {
  const capture_datetime = captureDatetime();
  let note = {
    run_group: run_group,
    schedule: schedule,
    modality: modality,
  };

  console.log(note);

  await addLogEvent(I, run_log, "onBoot", det, note, null);

  switch (run_group) {
    case "mmb":
      await onBootMMB(run_log, parseInt(schedule), capture_datetime);
      break;
    case "philips":
      await rsync_philips_mri(run_log, capture_datetime);
      break;
    case "hhm":
      await get_hhm_data(run_log, manufacturer, modality, capture_datetime);
      break;
    case "ip_reset":
      await reset_tunnel(run_log, capture_datetime);
      break;
    case "offline_alert":
      await insertOfflineTable();
      break;
    default:
      break;
  }
}

const onBoot = async () => {
  console.time("App Run Time");
  const run_log = await makeAppRunLog();

  let note = {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  };

  await addLogEvent(I, run_log, "onBoot", cal, note, null);

  try {
    const run_group = process.argv[2];
    const schedule = process.argv[3] || null;
    const manufacturer = process.argv[4] || null;
    const modality = process.argv[5] || null;

    console.log(run_group, schedule, manufacturer, modality);

    // Supply one or more SMEs in first arg array, but must be same manufac. & modality
    if (run_group === "manual") {
      await run_system_manual(run_log, ["SME02583"], ["GE", "MRI"]);
    }
    if (run_group === "config") {
      await build_config(system);
    }

    await runJob(run_log, run_group, schedule, manufacturer, modality);

    //await setTimeout(60_000);
    await writeLogEvents(run_log);
    console.log("\n********** END **********");
    console.timeEnd("App Run Time");
  } catch (error) {
    console.log(error);
    await addLogEvent(E, run_log, "onBoot", cat, null, error);
  }
};

onBoot();
