const { CronJob } = require("cron");
const { log } = require("../../logger");

const buildProdSchedules = async (runJob, machineConfigs) => {
  await log("info", "NA", "buildProdSchedules", "FN CALL", null);

  const testShConfigs = machineConfigs.filter(({ schedule }) => schedule === 0);
  const sh1Configs = machineConfigs.filter(({ schedule }) => schedule === 1);
  const sh2Configs = machineConfigs.filter(({ schedule }) => schedule === 2);
  const sh3Configs = machineConfigs.filter(({ schedule }) => schedule === 3);
  const sh4Configs = machineConfigs.filter(({ schedule }) => schedule === 4);
  const sh5Configs = machineConfigs.filter(({ schedule }) => schedule === 5);
  const sh6Configs = machineConfigs.filter(({ schedule }) => schedule === 6);
  const sh7Configs = machineConfigs.filter(({ schedule }) => schedule === 7);

  await log("info", "NA", "buildProdSchedules", "FN DETAILS", {
    testShConfigs: testShConfigs,
    sh1Configs: sh1Configs,
    sh2Configs: sh2Configs,
    sh3Configs: sh3Configs,
    sh4Configs: sh4Configs,
    sh5Configs: sh5Configs,
    sh6Configs: sh6Configs,
    sh7Configs: sh7Configs,
  });

  // VARYING
  const testSchedule = new CronJob("00 20,50 * * * *", async () => {
    for (const config of testShConfigs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 10 SEC AFTER MMB READING
  const schedule1 = new CronJob("10 15,45 * * * *", async () => {
    for (const config of sh1Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 20 SEC AFTER MMB READING
  const schedule2 = new CronJob("20 15,45 * * * *", async () => {
    for (const config of sh2Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 30 SEC AFTER MMB READING
  const schedule3 = new CronJob("30 15,45 * * * *", async () => {
    for (const config of sh3Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 40 SEC AFTER MMB READING
  const schedule4 = new CronJob("40 15,45 * * * *", async () => {
    for (const config of sh4Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 50 SEC AFTER MMB READING
  const schedule5 = new CronJob("50 15,45 * * * *", async () => {
    for (const config of sh5Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 60 SEC AFTER MMB READING
  const schedule6 = new CronJob("00 16,46 * * * *", async () => {
    for (const config of sh6Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  // 70 SEC AFTER MMB READING
  const schedule7 = new CronJob("10 16,46 * * * *", async () => {
    for (const config of sh7Configs) {
      const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
        config;
      runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
    }
  });

  return [
    testSchedule,
    schedule1,
    schedule2,
    schedule3,
    schedule4,
    schedule5,
    schedule6,
    schedule7,
  ];
};

// STAGING USE MORE AGGRESSIVE SCHEDULES
const buildStagingSchedules = async (runJob, machineConfigs, redisClient) => {
  await log("info", "NA", "buildStagingSchedules", "FN CALL", null);

  const testShConfigs = machineConfigs.filter(({ schedule }) => schedule === 0);

  // GLOB MULTIPLE SCHEDULES TOGETHER FOR STRESS TESTING
  const rduSchedules = [1, 2, 3, 4, 5];
  const eduSchedules = [6, 7];

  const sh1Configs = machineConfigs.filter(({ schedule }) =>
    rduSchedules.includes(schedule)
  );

  const sh2Configs = machineConfigs.filter(({ schedule }) =>
    eduSchedules.includes(schedule)
  );

  await log("info", "NA", "buildStagingSchedules", `FN DETAILS`, {
    testShConfigs: testShConfigs,
    sh1Configs: sh1Configs,
    sh2Configs: sh2Configs,
  });

  // let jobId = 0;

  // VARYING
  const testSchedule = new CronJob("40 30 * * * *", async () => {
    for (const config of testShConfigs) {
      const { sme, mmbScript, pgTable, regexModels } = config;
      runJob([sme, mmbScript, pgTable, regexModels], redisClient);
    }
  });

  const schedule1 = new CronJob("00 30 * * * *", async () => {
    for (const config of sh1Configs) {
      const { sme, mmbScript, pgTable, regexModels } = config;
      runJob([sme, mmbScript, pgTable, regexModels], redisClient);
    }
  });

  const schedule2 = new CronJob("20 30 * * * *", async () => {
    for (const config of sh2Configs) {
      const { sme, mmbScript, pgTable, regexModels } = config;
      runJob([sme, mmbScript, pgTable, regexModels], redisClient);
    }
  });

  return [testSchedule, schedule1, schedule2];
};

module.exports = {
  buildProdSchedules,
  buildStagingSchedules,
};
