const { log } = require('../../logger');

const parseCaptureBlocks = async (jobId, sme, newData) => {
   await log('info', jobId, 'parseCaptureBlocks', 'FN CALL', {
      sme: sme,
      'NEW DATA BYTE COUNT': newData.length,
   });

   try {
      // GET EACH INDIVIDUAL SCREEN CAPTURE READING
      // USUALLY ONLY 1 UNLESS A CONNECTION ERROR HAS OCCURRED
      // RESULTING IN AN ACUMULATION OF READINGS
      // TODO: CONVERT capture_reading GROUP FROM .* TO .+
      RE_CAPTURE_BLOCKS =
         /\[START\sCAPTURE\sBLOCK\s:\s(?<capture_dt>[\d]{4}-[\d]{2}-[\d]{2}T[\d]{2}:[\d]{2}:[\d]{2}Z)\b\].*?\[reading\](?<capture_reading>.*?)\[\/reading\].*\[END\sCAPTURE\sBLOCK\s:\s\1\]/gs;
      const captureBlockMatches = [...newData.matchAll(RE_CAPTURE_BLOCKS)];
      await log('info', jobId, 'parseCaptureBlocks', 'FN DETAILS', {
         'captureBlockMatches COUNT': captureBlockMatches.length,
      });
      // EX: capture_dt -> 2022-04-06T17:45:01Z
      // EX: capture_reading WITH MINUTE DATA
      // <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 TRANSITIONAL//EN"> <HTML> <HEAD>
      // ...
      // 0, 0 </html>

      // QA AND BUILD dtReadings OBJECT FOR SUBSEQUENT PARSING
      let dtReadings = [];
      for (const match of captureBlockMatches) {
         const { capture_dt, capture_reading } = match.groups;
         if (capture_reading === null) {
            dtReadings.push({ capture_dt: null });
            await log('warn', jobId, 'parseCaptureBlocks', 'FN DETAILS', {
               capture_dt: capture_dt,
               capture_reading: capture_reading,
            });
         } else {
            dtReadings.push({ [capture_dt]: capture_reading });
         }
      }

      // GET A REFERENCE TO THE OLDEST AND MOST RECENT CAPTURES BY DT
      // THESE MAY PROVE USEFUL DURING TROUBLESHOOTING
      const oldest = Object.keys(dtReadings[0]);
      const newest = Object.keys(dtReadings[dtReadings.length - 1]);
      await log(
         'info',
         jobId,

         'parseCaptureBlocks',
         'FN DETAILS -> MATCHES RANGES',
         {
            NEWEST: newest[0],
            OLDEST: oldest[0],
         }
      );
      return dtReadings;
   } catch (error) {
      await log('error', jobId, 'parseCaptureBlocks', 'FN CATCH', {
         error: error,
      });
      return null;
   }
};

module.exports = parseCaptureBlocks;
