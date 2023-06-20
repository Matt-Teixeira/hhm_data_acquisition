const getTunnelsByIP = require("../../utils/vpn/get-tunnels-by-ip");
const resetTunnels = require("../../utils/vpn/reset-tunnels");
const { get_redis_ip_queue, clear_redis_ip_queue } = require("../../redis");
const { group_queue_keys } = require("../../util");
const {
  get_philips_cv_data,
  get_philips_ct_data,
  get_philips_mri_data,
} = require("./philips");
const [addLogEvent] = require("../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../utils/logger/enums");
const { setTimeout } = require("timers/promises");

async function reset_tunnel(run_log) {
  try {
    // Get Redis systems that need tunnel resets
    const ip_queue = await get_redis_ip_queue();
    addLogEvent(I, run_log, "reset_tunnel", det, { ip_queue }, null);

    // Parse system data to get array of ip addresses
    const parsed_data = group_queue_keys(ip_queue);

    // Group IP by tunnel id
    const tunnels_by_ip = await getTunnelsByIP(run_log, parsed_data.ip_address);
    addLogEvent(
      I,
      run_log,
      "reset_tunnel",
      det,
      { tunnels: tunnels_by_ip },
      null
    );

    console.log(tunnels_by_ip);
    // Reset tunnels
    await resetTunnels(run_log, tunnels_by_ip);

    console.log("Start of timer")
    await setTimeout(5000);
    console.log("End of timer")

    // Clear tunnel reset queue
    //await clear_redis_ip_queue();

    // Run data acquisition
    const ran_systems = [];
    for (const system of ip_queue) {
      // Check for possible duplicates in queue and prevent double runs
      let is_duplicate = ran_systems.indexOf(system.id);
      if (is_duplicate !== -1) continue;

      const key = `${system.manufacturer}_${system.modality}`;
      addLogEvent(I, run_log, "reset_tunnel", det, { key }, null);
      switch (key) {
        case "Philips_CV/IR":
          get_philips_cv_data(run_log, system);
          break;

        default:
          break;
      }
      ran_systems.push(system.id);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = reset_tunnel;

/* 
[
  {
    id: 'SME02552',
    ip_address: '172.16.112.240',
    data_acquisition: { script: 'phil_cv_21.sh', hhm_credentials_group: '12' },
    manufacturer: 'Philips',
    modality: 'CV/IR'
  },
  {
    id: 'SME01394',
    ip_address: '172.18.21.229',
    data_acquisition: { script: 'phil_cv_21.sh', hhm_credentials_group: '12' },
    manufacturer: 'Philips',
    modality: 'CV/IR'
  },
]
*/
