const fsp = require("node:fs/promises");
const exec_local_rsync = require("../read/exec-copy_local");
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../utils/logger/enums");

async function rsync_local(run_log, rsync_path, system) {
  let note = {
    system_id: system.id
  }
  try {
    await addLogEvent(I, run_log, "rsync_local", cal, note, null);

    for (const file of system.hhm_file_config) {
      let key = Object.keys(file);

      if (key[0] === "monitoring") {
        for (const monitor_file of file.monitoring) {
          await exec_local_rsync(
            run_log,
            system.id,
            "./read/sh/rsync_monitoring_local.sh",
            [
              `${system.hhm_config.file_path}/host_logfiles/${monitor_file.file_name}`,
              `${system.hhm_config.file_path}/monitoring`,
            ]
          );
        }
      } else if (key[0] === "logcurrent") {
        await exec_local_rsync(
          run_log,
          system.id,
          "./read/sh/rsync_logcurrent_local.sh",
          [
            `${system.hhm_config.file_path}/host_logfiles/${file.logcurrent.file_name}`,
            `${system.hhm_config.file_path}`,
          ]
        );
      } else if (key[0] === "rmmu") {
        const files = await fsp.readdir(rsync_path);
        const rmmu_re_test = /rmmu\d+\.log/;

        // Gather only rmmu files. Example rmmu20140107030318.log
        const rmmu_files = files.filter((f) => rmmu_re_test.test(f) === true);

        for (const rmmu_file of rmmu_files) {
          await exec_local_rsync(
            run_log,
            system.id,
            "./read/sh/rsync_monitoring_local.sh",
            [
              `${system.hhm_config.file_path}/host_logfiles/${rmmu_file}`,
              `${system.hhm_config.file_path}/rmmu`,
            ]
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    await addLogEvent(E, run_log, "rsync_local", cat, note, null);
  }
}

module.exports = rsync_local;

// echo $3 | sudo -S mv $1 $2
