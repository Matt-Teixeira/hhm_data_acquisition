("use strict");
//require("dotenv").config();
const { log, loudPrint } = require("../logger");
const { getOnBootData } = require("./db/sql/qf-provider");
// BOOT
const getMachineConfigs = require("./boot/get-machine-configs");
const {
  buildProdSchedules,
  buildStagingSchedules,
} = require("./boot/build-schedules");
// READ
const short = require("short-uuid");
const execRsync = require("./read/exec-rsync");

const runJob = async (config) => {
  // UUID FOR EACH JOB
  const jobId = short.uuid();

  try {
    // THIS IS THE PRIMARY JOB FUNCTION
    await log("info", jobId, "runJob", "FN CALL", { config: config });

    // ["SME01096","v2_edu2","mmb_ge_mm3",["RE_GE_MM3_A"]]
    // TODO: RENAME machineRegexTags TO regexModels
    const [sme, mmbScript, pgTable, machineRegexTags, ip_address, user_id] = config;
    if (!(sme && mmbScript && pgTable && machineRegexTags)) {
      await log(
        "info",
        jobId,
        "runJob",
        "JOB HALTED -> NON-CONFORMANT config",
        { config: config }
      );
      return;
    }

    // **************************************************** READ ****************************************************
    // RSYNC FILE FROM REMOTE TO LOCAL AND GET THE NEWLY SYNC FILE SIZE
    const rsyncShPath = `./mmb/read/sh/rsync_mmb.sh`;
    const rsyncLocalPath = `./files/${sme}.${mmbScript}.log`; // EX. /home/prod/mmb-rpp/files/SME01113/v2_rdu_9600.log
    const rsyncRemotePath = `${mmbScript}.log`; // EX. v2_rdu_9600.log -> ~/v2_rdu_9600.log -> /home/avante/v2_rdu_9600.log
    const rsyncShArgs = [sme, rsyncRemotePath, rsyncLocalPath, ip_address, user_id];

    const fileSizeAfterRsync = await execRsync(
      jobId,
      sme,
      rsyncShPath,
      rsyncShArgs
    );
    console.log(fileSizeAfterRsync)
    // HALT JOB DUE TO BAD fileSizeAfterRsync
    if (fileSizeAfterRsync === null) {
      await log("info", jobId, "runJob", "JOB HALTED", {
        fileSizeAfterRsync: fileSizeAfterRsync,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    await log("error", jobId, "runJob", "FN CATCH", { error: error });
  }
};

const onBootMMB = async (shell) => {
  await log("info", "NA", "onBoot", "FN CALL", {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  });

  let redisClient;

  try {
    // ON BOOT GET DATA AND CONFIGS
    const [systems_configs] = await getOnBootData("onBoot");

    

    await log("info", "NA", "onBoot", "FN DETAILS", {
      systems_configs: systems_configs,
    });

    // BUILD CONFIGS FOR runJob
    const machineConfigs = await getMachineConfigs(systems_configs);

    console.log("machineConfigs")
    console.log(machineConfigs)

    // BUILD JOB SCHEDULES
    let schedules = [];
    switch (process.env.PG_DB) {
      case "dev_hhm":
        const sh1Configs = machineConfigs.filter(({ schedule }) => schedule === shell);
        for (const config of sh1Configs) {
          const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
            config;
          runJob([sme, mmbScript, pgTable, regexModels, ip_address, user_id]);
        }
        /* schedules = await buildProdSchedules(
          runJob,
          machineConfigs
        ); */
        break;
      case "staging":
        schedules = await buildStagingSchedules(
          runJob,
          machineConfigs
        );
        break;
      case "mig_profiles_units_prod":
        await log(
          "info",
          "NA",
          "onBoot",
          "FN DETAILS -> DEV ENV, NO SCHEDULES",
          null
        );
        break;
      default:
        redisClient.disconnect();
        throw new Error("onBoot FN CATCH -> NON-CONFORMANT process.env.PG_DB");
    }

    if (process.env.PG_DB === "prod" || process.env.PG_DB === "staging" || process.env.PG_DB === "dev_hhm") {
      // || process.env.PG_DB === "dev_hhm"
      // START SCHEDULES
      for (const schedule of schedules) {
        schedule.start();
      }
      await log(
        "info",
        "NA",
        "onBoot",
        "FN DETAILS -> SCHEDULES STARTED",
        null
      );
    } else {
      // const dev_id = 'SME15799';
      // const dev_table = 'mmb_ge_mm3';
      // const dev_id = 'SME08722';
      // const dev_table = 'mmb_ge_mm4';
      // const dev_id = 'SME01111';
      // const dev_table = 'mmb_siemens';
      const dev_id = "SME10257";
      // const dev_table = 'mmb_siemens_non_tim';
      const dev_table = "mmb_siemens";
      // THERE SHOULD ONLY BE 1 MATCH SO DESTRUCTOR STRAIGHT TO OBJECT AT IDX 0
      const [dev_system] = systems_configs.filter(({ id }) => id === dev_id);
      // AGAIN, IDX 0 ONLY
      const [dev_config] = dev_system.mmb_config.rpp_configs.filter(
        ({ pgTable }) => pgTable === dev_table
      );
      dev_config.ip_address = dev_system.ip_address;
      dev_config.user_id = dev_system.user_id;
      const { mmbScript, regexModels, ip_address, user_id } = dev_config;
      const dev_job_config = [
        dev_id,
        mmbScript,
        dev_table,
        regexModels,
        ip_address,
        user_id,
      ];

      await log("info", "NA", "onBoot", "FN DETAILS", {
        dev_job_config: dev_job_config,
      });

      // THIS PREVENTS UNHANDLED EXCEPTION, BUT await runJob() NOT GOOD
      // try {
      //    await runJob(0, dev_job_config, redisClient);
      // } catch (error) {
      //    throw new Error(`IDFKGD FN CATCH -> ${error.message}`, {
      //       cause: error,
      //    });
      // }

      // MAYBE DON'T CONVERT runJob FN TO ERROR THROW TO
      // PARENT PATTERN UNTIL WE REMOVE INTERNAL SCHEDULES
      runJob(dev_job_config, redisClient);
    }
  } catch (error) {
    console.log(error);
    await log("error", "NA", "onBoot", "FN CATCH", {
      error: error,
    });
  }
};

module.exports = onBootMMB;
