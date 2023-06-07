const exec_tunnel_reset = require("../../read/exec-tunnel_reset");

async function reset_tunnel(jobId, sme, ip_address) {
  execPath = process.env.TUNNEL_RESET_APP;
  const reset_status = await exec_tunnel_reset(jobId, sme, execPath, [
    ip_address,
  ]);

  if (reset_status.trim() === "true") return true;
  return false;
}

module.exports = reset_tunnel;
