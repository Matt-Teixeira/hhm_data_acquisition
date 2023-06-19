const { log } = require("../logger");
const initRedis = require("./redis_instance");
const fs = require("node:fs").promises;

async function update_last_dir_date(sme, path) {
  const redisClient = await initRedis(
    process.env.REDIS_PORT,
    process.env.REDIS_IP
  );
  try {
    const files_in_dir = await fs.readdir(path);
    console.log("\nfiles_in_dir");
    console.log(files_in_dir);

    const last_dir_date = files_in_dir[files_in_dir.length - 1].split("_");

    console.log(last_dir_date);

    await redisClient.quit();
    return;
    const setKey = `${sme}.phil_cv_date`;
    const setValue = date;
    await redisClient.set(setKey, setValue);
    await redisClient.quit();
  } catch (error) {
    console.log(error);
    await redisClient.quit();
  }
}

module.exports = { update_last_dir_date };
