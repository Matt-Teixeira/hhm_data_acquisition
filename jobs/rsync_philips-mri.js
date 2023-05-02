const { log } = require("../logger");
const exec_remote_rsync = require("../read/exec-remote_rsync");
const rsync_local = require("../relocate_files/rsync_local");
const { get_phil_mri_systems } = require("../sql/qf-provider");
const short = require("short-uuid");

const rsync_philips_mri = async () => {
  const jobId = short.uuid();
  log("info", jobId, "NA", "rsync_philips_mri", `FN CALL`);

  try {
    const system_data = await get_phil_mri_systems(jobId);

    for await (const system of system_data) {
      console.log(system);
      console.log([
        system.user_id,
        system.ip_address,
        system.hhm_config.file_path,
      ]);
      await exec_remote_rsync(jobId, system.id, "./read/sh/rsync_mmb.sh", [
        system.user_id,
        system.ip_address,
        system.hhm_config.file_path,
      ]);
      await rsync_local(
        jobId,
        `${system.hhm_config.file_path}/host_logfiles`,
        system
      );
    }
  } catch (error) {
    console.log(error);
    await log("error", jobId, "NA", "redisClient", `ON ERROR`, {
      error: error,
    });
  }
};

module.exports = rsync_philips_mri;
/*
system in for loop

{
  id: 'SME15805',
  hhm_config: {
    modality: 'MRI',
    data_acqu: 'mmb',
    file_path: '/opt/files/SME15805/hhm',
    run_group: 1
  },
  hhm_file_config: [ { logcurrent: [Object] }, { monitoring: [Array] } ],
  ip_address: '172.31.3.51',
  user_id: 'avante'
}

*/
