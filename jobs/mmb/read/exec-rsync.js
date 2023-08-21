const { log } = require("../../../logger");
const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue, add_to_online_queue } = require("../../../redis");

const [addLogEvent] = require("../../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../../utils/logger/enums");

const execRsync = async (
  run_log,
  job_id,
  sme,
  rsyncShPath,
  rsyncShArgs,
  capture_datetime,
  ip_reset = false

) => {
  //  console.log(rsyncShArgs);
  // THIS FUNCTION SYNCS A REMOTE FILE TO A LOCAL MIRROR AND RETURNS THE NEWLY SYNCED FILE SIZE
  let note = {
    job_id,
    sme: sme,
    rsyncShPath: rsyncShPath,
    rsyncShArgs: rsyncShArgs,
  };
  await addLogEvent(I, run_log, "execRsync", cal, note, null);

  const connection_test_1 = /Connection timed out/g;

  try {
    const { stdout } = await execFile(rsyncShPath, rsyncShArgs);

    const fileSizeAfterRsync = parseInt(stdout);

    let note = {
      job_id,
      sme,
      fileSizeAfterRsync,
    };

    await addLogEvent(I, run_log, "execRsync", det, note, null);

    if (capture_datetime !== "ip_reset") {
      await add_to_online_queue(run_log, {
        id: sme,
        capture_datetime,
        successful_acquisition: true,
      });
    }

    return fileSizeAfterRsync;
  } catch (error) {
    let note = {
      job_id,
      sme,
    };

    await addLogEvent(E, run_log, "execRsync", cat, note, error);
    //console.log(error);

    if (connection_test_1.test(error)) {
      let system = {
        id: rsyncShArgs[0],
        ip_address: rsyncShArgs[3],
        data_source: "mmb",
        rsyncShArgs,
        rsyncShPath,
      };

      // Only runs for ip reset instance
      // Reason: In initial data pull, if connection issue occurs, just send to ip:queue and make second attempt.
      // If connection issue occurs on second attempt (ip reset job), place in online:queue to then place in heartbeat table
      if (ip_reset) {
        await add_to_online_queue(run_log, {
          id: system.id,
          capture_datetime,
          successful_acquisition: false,
        });

        return null;
      }

      await add_to_redis_queue(run_log, system);

      return null;
    }
    return null;
  }
};

module.exports = execRsync;

/* 
EXAMPLE: rsyncShArgs
[
  "SME10257",
  "v2_rdu_9600.log",
  "./files/SME10257.v2_rdu_9600.log",
  "25.63.233.139",
  "jdis",
];

EXAMPLE: What is currently sent to ip:queue
{
  id: 'SME12452',
  ip_address: '10.184.10.205',
  data_acquisition: { script: 'ge_mri_22.sh', hhm_credentials_group: '6' },
  manufacturer: 'GE',
  modality: 'MRI'
}
 */
