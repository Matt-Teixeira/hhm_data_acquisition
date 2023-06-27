const exec_remote_rsync = require("../../read/exec-remote_rsync");
const rsync_local = require("../../relocate_files/rsync_local");
const { get_phil_mri_systems } = require("../../sql/qf-provider");
const short = require("short-uuid");
const [addLogEvent] = require("../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../utils/logger/enums");

const rsync_philips_mri = async (run_log) => {
  const system_data = await get_phil_mri_systems();
  console.log(system_data);

  const child_processes = [];
  for (const system of system_data) {
    child_processes.push(async () => await group_processes(run_log, system));

    try {
    } catch (error) {
      addLogEvent(E, run_log, "rsync_philips_mri", cat, {system}, error);
    }
    try {
      // CREATE AN ARRAY OF PROMISES BY CALLING EACH child_process FUNCTION
      const promises = child_processes.map((child_process) => child_process());
  
      // AWAIT PROMISIS
      await Promise.all(promises);
    } catch (error) {
      addLogEvent(E, run_log, "rsync_philips_mri", cat, null, error);
    }
  }
};

async function group_processes(run_log, system) {
  addLogEvent(I, run_log, "rsync_philips_mri", cal, {system}, null);
  await exec_remote_rsync(run_log, system.id, "./read/sh/rsync_mmb.sh", [
    system.user_id,
    system.ip_address,
    system.hhm_config.file_path,
  ]);
  await rsync_local(run_log, `${system.hhm_config.file_path}/host_logfiles`, system);
}

module.exports = rsync_philips_mri;
