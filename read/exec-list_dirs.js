const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const { add_to_redis_queue, add_to_online_queue } = require("../redis");
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf }
} = require("../utils/logger/enums");

const exec_list_dirs = async (
  run_log,
  sme,
  path,
  system,
  args,
  capture_datetime,
  ip_reset
) => {
  let note = {
    system_id: sme,
    args
  };
  await addLogEvent(I, run_log, "exec_list_dirs", cal, note, null);

  const connection_test_1 = /Connection timed out/;
  const connection_test_2 = /error: max-retries exceeded/;

  try {
    const { stdout, stderr } = await execFile(path, args);

    console.log("\n ************* stdout");
    console.log(stdout);

    console.log("\n ************* stderr");
    console.log(stderr);

    // If connection is closed, return false
    if (connection_test_1.test(stderr) || connection_test_2.test(stderr)) {
      let note = {
        system_id: sme,
        stdout,
        stderr
      };
      await addLogEvent(W, run_log, "exec_list_dirs", det, note, null);
      system.data_source = "hhm";

      if (ip_reset) {
        await add_to_online_queue(run_log, {
          id: system.id,
          capture_datetime,
          successful_acquisition: false,
          data_source: "hhm"
        });

        return false;
      }

      await add_to_redis_queue(run_log, system);
      return false;
    }

    await add_to_online_queue(run_log, {
      id: system.id,
      capture_datetime,
      successful_acquisition: true,
      data_source: "hhm"
    });

    return stdout;
  } catch (error) {
    console.log(error);

    if (
      connection_test_1.test(error.message) ||
      connection_test_2.test(error.message)
    ) {
      let note = {
        system_id: sme
      };
      await addLogEvent(E, run_log, "exec_list_dirs", cat, note, error);
      system.data_source = "hhm";
      await add_to_redis_queue(run_log, system);
      return false;
    }
    return null;
  }
};

module.exports = exec_list_dirs;
