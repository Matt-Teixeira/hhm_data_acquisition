const { log } = require("../../logger");
const exec_remote_rsync = require("../../read/exec-remote_rsync");
const rsync_local = require("../../relocate_files/rsync_local");
const { get_phil_mri_systems } = require("../../sql/qf-provider");
const short = require("short-uuid");

const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../logger/enums");
const [addLogEvent, writeLogEvents] = require("../../logger/log");

const rsync_philips_mri = async (run_id) => {
  
  log("info", run_id, "NA", "rsync_philips_mri", `FN CALL`);

  addLogEvent(I, run_id, "rsync_philips_mri", det, null, null);

  try {
    const system_data = await get_phil_mri_systems(run_id);

    for (const system of system_data) {
      const job_id = short.uuid();
      console.log(system);
      console.log([
        system.user_id,
        system.ip_address,
        system.hhm_config.file_path,
      ]);
       exec_remote_rsync(run_id, system.id, "./read/sh/rsync_mmb.sh", [
        system.user_id,
        system.ip_address,
        system.hhm_config.file_path,
      ]);
       rsync_local(
        run_id,
        `${system.hhm_config.file_path}/host_logfiles`,
        system
      );
    }
  } catch (error) {
    console.log(error);
    await log("error", run_id, "NA", "redisClient", `ON ERROR`, {
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
