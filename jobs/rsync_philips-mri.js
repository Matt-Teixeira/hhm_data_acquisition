const { log } = require("../logger");
const exec_remote_rsync = require("../read/exec-remote_rsync");
const rsync_local = require("../relocate_files/rsync_local");
const { get_phil_mri_systems } = require("../sql/qf-provider");

const rsync_philips_mri = async (jobId) => {
  log("info", jobId, "NA", "rsync_philips_mri", `FN CALL`);

  try {
    const system_data = await get_phil_mri_systems(jobId);

    for await (const system of system_data) {
      await exec_remote_rsync(jobId, "SME15805", "./read/sh/rsync_mmb.sh", [
        "avante",
        "172.31.3.51",
        system.hhm_config.file_path,
      ]);
     await rsync_local(jobId,
        `${system.hhm_config.file_path}/host_logfiles`, system
      );
    }
  } catch (error) {
    console.log(error)
    await log("error", jobId, "NA", "redisClient", `ON ERROR`, {
      error: error,
    });
  }
};

module.exports = rsync_philips_mri;
