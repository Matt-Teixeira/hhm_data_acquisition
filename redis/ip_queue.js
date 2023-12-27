const initRedis = require("./redis_instance");
const [addLogEvent] = require("../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../utils/logger/enums");

async function add_to_redis_queue(job_id, run_log, system) {
  //const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  let note = {
    job_id,
    system_id: system.id,
  };
  await addLogEvent(I, run_log, "add_to_redis_queue", cal, note, null);

  console.log("System sent to Redis");
  console.log(system);

  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    await redisClient.sendCommand([
      "RPUSH",
      "ip:queue",
      JSON.stringify(system),
    ]);
    await redisClient.quit();
    let note = {
      job_id,
      system_id: system.id,
      queue: "ip:queue",
      message: "Sent to Redis queue",
    };
    await addLogEvent(I, run_log, "add_to_redis_queue", det, note, null);
  } catch (error) {
    console.log(error);
    await redisClient.quit();
    let note = {
      job_id,
      system_id: system.id,
      queue: "ip:queue",
      message: "Queue insert failed",
    };
    await addLogEvent(E, run_log, "add_to_redis_queue", cat, note, error);
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
