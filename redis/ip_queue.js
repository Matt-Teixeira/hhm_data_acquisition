const { log } = require("../logger");
const initRedis = require("./index");

async function add_to_redis_queue(ip_address) {
  const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  // Example usage:
  if (!ipAddressRegex.test(ip_address)) {
    console.log("Not a valid IP address format: " + ip_address);
    await log("error", "JobID", "NA", "add_to_redis_queue", `ON ERROR`, {
      error: "Not a valid IP address format",
      ip_address,
    });
  }

  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    await redisClient.sendCommand(["RPUSH", "ip:queue_u", ip_address]);
    await redisClient.quit();
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

module.exports = add_to_redis_queue;
