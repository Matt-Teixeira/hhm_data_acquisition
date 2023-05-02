const { log } = require('../../../logger');

const qaMatches = async (jobId, dt, reading, regex, matches) => {
   let failedQA = true;

   // SHORT CIRCUIT NULL MATCHES
   if (matches === null) {
      await log(
         'warn',
         jobId,
         'qaMatches',
         'FN DETAILS -> MATCH ANOMALY -> NULL MATCHES',
         {
            regex: regex.toString(),
            dt: dt,
            reading: reading,
         }
      );
      return failedQA;
   }

   // SHORT CIRCUIT MISSES
   if (matches.length === 0) {
      await log(
         'warn',
         jobId,
         'qaMatches',
         'FN DETAILS -> MATCH ANOMALY -> 0 MATCHES',
         {
            regex: regex.toString(),
            dt: dt,
            reading: reading,
         }
      );
      return failedQA;
   }

   // FORCE PROGRESSION THROUGH ALL SHORT CIRCUITS FOR PASSING QA
   failedQA = false;
   return failedQA;
};

module.exports = qaMatches;
