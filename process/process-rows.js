const { log } = require('../../logger');
const generateDateTimeObject = require('./generate-dt-object');

const processRows = async (jobId, pgTable, rows) => {
   await log('info', jobId, 'processRows', 'FN CALLED', { pgTable: pgTable });

   for (const rowTemplate of rows) {
      // SPECIFIC PROCESSING
      const hostTime = rowTemplate.host_time;
      const hostDate = rowTemplate.host_date;
      let inputPattern;
      switch (pgTable) {
         case 'mmb_ge_mm3':
            inputPattern = 'dd-MMM-yyHH:mm';
            break;
         case 'mmb_ge_mm4':
            inputPattern = 'ddMMyyHHmm';
            break;
         case 'mmb_siemens':
            inputPattern = 'dd-MMM-yyHH:mm:ss';
            break;
         case 'mmb_siemens_non_tim':
            inputPattern = 'dd-MMM-yyyyHH:mm:ss';
            break;
         default:
            break;
      }
      if (hostTime && hostDate) {
         rowTemplate.host_datetime = await generateDateTimeObject(
            jobId,
            `${hostDate}${hostTime}`,
            inputPattern,
            'America/New_York'
         );
      } else {
         await log(
            'warn',
            jobId,
            'postParseProcessing',
            `FN DETAILS -> CAN'T generateDateTimeObject`,
            {
               'rowTemplate.host_date': rowTemplate.host_date,
               'rowTemplate.host_time': rowTemplate.host_time,
            }
         );
      }

      await log('info', jobId, 'processRows', 'FN DETAILS', {
         'rowTemplate POST PROCESS': rowTemplate,
      });
   }
};

module.exports = processRows;
