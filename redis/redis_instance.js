("use strict");
const { log } = require("../logger");
const redis = require("redis");

async function initRedis(PORT, REDIS_IP) {
  // SETUP ENV BASED RESOURCES -> REDIS CLIENT, JOB SCHEDULES
  const clienConfig = {
    socket: {
      port: PORT,
      host: REDIS_IP,
    },
  };

  const redisClient = redis.createClient(clienConfig);

  redisClient.on(
    "error",
    async (error) =>
      await log("error", "NA", "NA", "redisClient", `ON ERROR`, {
        // TODO: KILL APP?
        error: error,
      })
  );

  await redisClient.connect();

  return redisClient;
}

module.exports = initRedis;
