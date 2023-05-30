const fs = require('fs');
const path = `/home/matt-teixeira/hep3/hhm_data_acquisition/logger/${process.env.APP_NAME}-log.${process.env.LOGGER}.js`;
const writeStream = fs.createWriteStream(path, {
   flags: 'a',
});
const enums = require('./enums');
const db = require("../db/pgPool");
const { pg_tables, pg_column_sets } = require('../db/sql/pg-helpers');

const log_events = [];
const addLogEvent = async (type, run_id, func, tag, note, err) => {
   // GENERIC log_event VALUES ADDED
   let log_event = {
      run_id: run_id,
      dt: new Date().toISOString(),
      type: type,
      func: func,
      tag: tag,
      note: note,
   };

   console.log(log_event)

   // CONDITIONALLY APPEND ERROR OBJECT'S STACK IF IT EXISTS
   if (type === enums.type.E) {
      log_event['err_msg'] = err.stack ? err.stack : err;

      // PRINT ERRORS TO CONSOLE FOR DEV QUICK VIEW
      console.log(log_event);
   }

   log_events.push(log_event);
   
};

const dbInsertLogEvents = async (pgp, run_id) => {
   const {
      type: { I, E },
      tag: { det, cat },
   } = enums;

   try {
      const we_logs = log_events.filter(
         ({ type }) => type === 'WARN' || type === 'ERROR'
      );
      const app_run_log = [
         {
            app_name: process.env.APP_NAME,
            run_id: run_id,
            verbose_log: JSON.stringify(log_events),
            warn_error_logs: JSON.stringify(we_logs),
         },
      ];

      // STORE LOGS TO PG
      const query = pgp.helpers.insert(
         app_run_log,
         pg_column_sets.util.app_run_logs
      );
      await db.none(query);

      const note = { txt: 'DB INSERT SUCCESSFUL' };
      addLogEvent(I, run_id, 'dbInsertLogEvents', det, note, null);
   } catch (error) {
      console.log(error)
      addLogEvent(E, run_id, 'dbInsertLogEvents', cat, null, error);
   }
};

const writeLogEvents = async () => {
   // PROVIDE BASIC INFO TO DEV
   console.log(`\nFIRST LOG EVENT: ${JSON.stringify(log_events[0])}`);
   console.log(
      `LAST LOG EVENT: ${JSON.stringify(log_events[log_events.length - 1])}\n`
   );

   try {
      // WRITE LOGS TO DISK
      writeStream.write(JSON.stringify(log_events));
      writeStream.end();
      console.log(`WRITING ${log_events.length} EVENTS TO DISK`);
   } catch (error) {
      console.log(error)
      console.log(`!!! writeLogEvents ERROR !!!`);
   }
};

module.exports = [addLogEvent, writeLogEvents, dbInsertLogEvents];
