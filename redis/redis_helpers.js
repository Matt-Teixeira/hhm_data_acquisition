const initRedis = require("./redis_instance");
const fs = require("node:fs").promises;

// .last_phil_cv_dir
// .last_phil_cv_lod

async function get_previous_dir(sme, type) {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const getKey = `${sme}.${type}`;
    console.log("\ngetKey");
    console.log(getKey);
    const directory = await redisClient.get(getKey);
    await redisClient.quit();
    if (directory === "") return null;
    return directory;
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

async function update_last_dir_date(sme, directory, type) {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const setKey = `${sme}.${type}`;
    const setValue = directory;
    await redisClient.set(setKey, setValue);
    await redisClient.quit();
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

module.exports = { update_last_dir_date, get_previous_dir };
