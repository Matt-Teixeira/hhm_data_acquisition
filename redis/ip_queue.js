const { log } = require("../logger");
const initRedis = require("./redis_instance");

async function add_to_redis_queue(system) {
  //const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  console.log("System sent to Redis");
  console.log(system);

  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    await redisClient.sendCommand(["RPUSH", "ip:queue", system]);
    await redisClient.quit();
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

async function get_redis_ip_queue() {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const queue_data = await redisClient.sendCommand([
      "lrange",
      "ip:queue",
      "0",
      "1000",
    ]);
    await redisClient.quit();
    const ip_systems = [];
    for (const system of queue_data) ip_systems.push(JSON.parse(system));
    return ip_systems;
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

async function clear_redis_ip_queue() {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const queue_data = await redisClient.sendCommand(["del", "ip:queue"]);
    await redisClient.quit();
    return queue_data;
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

module.exports = {
  add_to_redis_queue,
  get_redis_ip_queue,
  clear_redis_ip_queue,
};
