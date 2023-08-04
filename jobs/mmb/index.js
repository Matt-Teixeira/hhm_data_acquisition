("use strict");
//require("dotenv").config();
const { log } = require("../../logger");
const { getOnBootData, get_systems_by_schedule } = require("./sql/qf-provider");
// BOOT
const getMachineConfigs = require("./boot/get-machine-configs");
// READ
const execRsync = require("./read/exec-rsync");
const { filter_schedules } = require("./helpers");
const { v4: uuidv4 } = require("uuid");

const [addLogEvent] = require("../../utils/logger/log");
const {
  type: { I, W, E },
  tag: { cal, det, cat, seq, qaf },
} = require("../../utils/logger/enums");

const runJob = async (run_log, config) => {
  // UUID FOR EACH JOB
  const job_id = uuidv4();

  try {
    // THIS IS THE PRIMARY JOB FUNCTION
    let note = {
      job_id,
      config,
    };
    await addLogEvent(I, run_log, "runJob", cal, note, null);

    // ["SME01096","v2_edu2","mmb_ge_mm3",["RE_GE_MM3_A"]]
    // TODO: RENAME machineRegexTags TO regexModels
    const [sme, mmbScript, pgTable, machineRegexTags, ip_address, user_id] =
      config;
    if (!(sme && mmbScript && pgTable && machineRegexTags)) {
      let note = {
        job_id,
        config,
        message: "JOB HALTED -> NON-CONFORMANT config",
      };
      await addLogEvent(W, run_log, "runJob", det, note, null);
      return;
    }

    // **************************************************** READ ****************************************************
    // RSYNC FILE FROM REMOTE TO LOCAL AND GET THE NEWLY SYNC FILE SIZE
    console.log(`./files/${sme}.${mmbScript}.log`);
    const rsyncShPath = `./jobs/mmb/read/sh/rsync_mmb.sh`;
    const rsyncLocalPath = `./files/${sme}.${mmbScript}.log`; // EX. /home/prod/mmb-rpp/files/SME01113/v2_rdu_9600.log
    const rsyncRemotePath = `${mmbScript}.log`; // EX. v2_rdu_9600.log -> ~/v2_rdu_9600.log -> /home/avante/v2_rdu_9600.log
    const rsyncShArgs = [
      sme,
      rsyncRemotePath,
      rsyncLocalPath,
      ip_address,
      user_id,
    ];

    const fileSizeAfterRsync = await execRsync(
      run_log,
      job_id,
      sme,
      rsyncShPath,
      rsyncShArgs
    );
    console.log("\nfileSizeAfterRsync");
    console.log(fileSizeAfterRsync);
    // HALT JOB DUE TO BAD fileSizeAfterRsync
    if (fileSizeAfterRsync === null) {
      let note = {
        job_id,
        config,
        fileSizeAfterRsync,
        message: "JOB HALTED",
      };
      await addLogEvent(W, run_log, "runJob", det, note, null);
      return;
    }
  } catch (error) {
    console.log(error);
    let note = {
      job_id,
      config,
      error,
    };
    await addLogEvent(E, run_log, "runJob", cat, note, error);
  }
};

const onBootMMB = async (run_log, process_argv) => {
  let note = {
    LOGGER: process.env.LOGGER,
    REDIS_IP: process.env.REDIS_IP,
    PG_USER: process.env.PG_USER,
    PG_DB: process.env.PG_DB,
  };

  await addLogEvent(I, run_log, "onBootMMB", cal, note, null);

  try {
    // ON BOOT GET DATA AND CONFIGS
    const systems_configs = await get_systems_by_schedule(
      process_argv.toString()
    );

    let note = {
      systems_configs: systems_configs,
    };
    await addLogEvent(I, run_log, "onBootMMB", det, note, null);

    // BUILD CONFIGS FOR runJob
    const machineConfigs = await getMachineConfigs(systems_configs);

    // BUILD JOB SCHEDULES
    let schedules = [];
    switch (process.env.PG_DB) {
      case "prod":
        const prodConfigs = machineConfigs.filter(
          ({ schedule }) => schedule === process_argv
        );
        const prod_jobs = [];
        for (const config of prodConfigs) {
          const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
            config;

          prod_jobs.push(
            async () =>
              await runJob(run_log, [
                sme,
                mmbScript,
                pgTable,
                regexModels,
                ip_address,
                user_id,
              ])
          );
        }
        // CREATE AN ARRAY OF PROMISES BY CALLING EACH FUNCTION
        const job_promises = prod_jobs.map((job) => job());

        // AWAIT JOBS
        await Promise.all(job_promises);
        break;
      case "staging":
        //filter_schedules(runJob, machineConfigs, process_argv);
        const stagingConfigs = machineConfigs.filter(
          ({ schedule }) => schedule === process_argv
        );
        const staging_jobs = [];
        for (const config of stagingConfigs) {
          const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
            config;

          staging_jobs.push(
            async () =>
              await runJob(run_log, [
                sme,
                mmbScript,
                pgTable,
                regexModels,
                ip_address,
                user_id,
              ])
          );
        }
        // CREATE AN ARRAY OF PROMISES BY CALLING EACH FUNCTION
        const job_promises_staging = staging_jobs.map((job) => job());

        // AWAIT JOBS
        await Promise.all(job_promises_staging);
        break;
      case "dev_hhm":
        const devConfigs = machineConfigs.filter(
          ({ schedule }) => schedule === process_argv
        );
        const dev_jobs = [];
        for (const config of devConfigs) {
          const { sme, mmbScript, pgTable, regexModels, ip_address, user_id } =
            config;

          dev_jobs.push(
            async () =>
              await runJob(run_log, [
                sme,
                mmbScript,
                pgTable,
                regexModels,
                ip_address,
                user_id,
              ])
          );
        }
        // CREATE AN ARRAY OF PROMISES BY CALLING EACH FUNCTION
        const job_promises_dev = dev_jobs.map((job) => job());

        // AWAIT JOBS
        await Promise.all(job_promises_dev);
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
        throw new Error("onBoot FN CATCH -> NON-CONFORMANT process.env.PG_DB");
    }

    if (
      process.env.PG_DB === "prod" ||
      process.env.PG_DB === "staging" ||
      process.env.PG_DB === "dev_hhm"
    ) {
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
      runJob(dev_job_config);
    }
  } catch (error) {
    console.log(error);
    await log("error", "NA", "onBoot", "FN CATCH", {
      error: error,
    });
  }
};

module.exports = onBootMMB;
