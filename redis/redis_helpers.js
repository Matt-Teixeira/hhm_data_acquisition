const { log } = require("../logger");
const initRedis = require("./redis_instance");
const fs = require("node:fs").promises;

async function update_last_dir_date(sme, directory) {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const setKey = `${sme}.last_phil_cv_dir`;
    const setValue = directory;
    await redisClient.set(setKey, setValue);
    await redisClient.quit();
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

module.exports = { update_last_dir_date };
