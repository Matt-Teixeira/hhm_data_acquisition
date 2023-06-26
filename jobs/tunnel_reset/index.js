const getTunnelsByIP = require("../../utils/vpn/get-tunnels-by-ip");
const resetTunnels = require("../../utils/vpn/reset-tunnels");
const { get_redis_ip_queue, clear_redis_ip_queue } = require("../../redis");
const { group_queue_keys } = require("../../util");
const get_philips_data = require("./philips");
const get_ge_data = require("./ge");
const get_siemens_data = require("./siemens");
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
    if (!ip_queue.length) {
      let note = { message: "No IP addresses in queue" };
      addLogEvent(I, run_log, "reset_tunnel", det, note, null);
      return;
    }
    console.log(ip_queue);
    addLogEvent(I, run_log, "reset_tunnel", det, { ip_queue }, null);

    // Parse system data to get array of ip addresses
    const parsed_data = group_queue_keys(ip_queue);

    console.log("\nparsed_data");
    console.log(parsed_data);

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

    console.log("Start of 10 second timer");
    await setTimeout(10_000);
    console.log("End of timer");

    // Clear tunnel reset queue
    await clear_redis_ip_queue();

    // Run data acquisition

    // Store and prevent run of duplicate systems
    const ran_systems = [];

    const jobs = [];

    for (const system of ip_queue) {
      // Check for possible duplicates in queue and prevent double runs
      let is_duplicate = ran_systems.indexOf(system.id);
      if (is_duplicate !== -1) continue;

      switch (system.manufacturer) {
        case "GE":
          jobs.push(async () => await get_ge_data(run_log, system));
          break;
        case "Philips":
          jobs.push(async () => await get_philips_data(run_log, system));
          break;
        case "Siemens":
          jobs.push(async () => await get_siemens_data(run_log, system));
          break;
        default:
          break;
      }
      ran_systems.push(system.id);
    }

    try {
      // CREATE AN ARRAY OF PROMISES BY CALLING EACH child_process FUNCTION
      const promises = jobs.map((job) => job());

      // AWAIT PROMISIS
      await Promise.all(promises);

      // Check queue and log systems that were added again. (Tunnel resets did not resolve connection issue)
      const ip_queue_post_reset = await get_redis_ip_queue();
      if (!ip_queue_post_reset.length) {
        let note = {
          message: "No IP addresses in queue after tunnel resets",
          ip_queue_post_reset,
        };
        addLogEvent(I, run_log, "reset_tunnel", det, note, null);
        return;
      }
      let note = {
        message: "Data not acquired post tunnel reset",
        ip_queue_post_reset,
      };
      addLogEvent(I, run_log, "reset_tunnel", det, note, null);
    } catch (error) {
      addLogEvent(E, run_log, "get_ge_ct_data", cat, null, error);
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
