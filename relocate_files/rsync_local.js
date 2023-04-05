const { log } = require("../logger");
const fsp = require("node:fs/promises");
const exec_local_rsync = require("../read/exec-copy_local");

async function rsync_local(jobId, rsync_path, system_config) {
  try {
    await log("info", jobId, system_config.id, "rsync_local", "FN CALL");

    for (const file of system_config.hhm_file_config) {
      let key = Object.keys(file);

      if (key[0] === "monitoring") {
        for (const monitor_file of file.monitoring) {
          await exec_local_rsync(
            jobId,
            system_config.id,
            "./read/sh/rsync_monitoring_local.sh",
            [
              `${system_config.hhm_config.file_path}/host_logfiles/${monitor_file.file_name}`,
              `${system_config.hhm_config.file_path}/monitoring`,
            ]
          );
        }
      } else if (key[0] === "logcurrent") {
        await exec_local_rsync(
          jobId,
          system_config.id,
          "./read/sh/rsync_logcurrent_local.sh",
          [
            `${system_config.hhm_config.file_path}/host_logfiles/${file.logcurrent.file_name}`,
            `${system_config.hhm_config.file_path}`,
          ]
        );
      } else if (key[0] === "rmmu") {
        const files = await fsp.readdir(rsync_path);
        const rmmu_re_test = /rmmu\d+\.log/;

        // Gather only rmmu files. Example rmmu20140107030318.log
        const rmmu_files = files.filter((f) => rmmu_re_test.test(f) === true);

        for (const rmmu_file of rmmu_files) {
          await exec_local_rsync(
            jobId,
            system_config.id,
            "./read/sh/rsync_monitoring_local.sh",
            [
              `${system_config.hhm_config.file_path}/host_logfiles/${rmmu_file}`,
              `${system_config.hhm_config.file_path}/rmmu`,
            ]
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    await log("error", jobId, system_config.id, "rsync_local", "FN CATCH", {
      error: error,
    });
  }
}

module.exports = rsync_local;

// echo $3 | sudo -S mv $1 $2
