const { log } = require('../../logger');
const { DateTime } = require('luxon');

const generateDateTimeObject = async (
   jobId,
   dtString,
   inputPattern,
   ianaTz
) => {
   try {
      const iso_dt = DateTime.fromFormat(dtString, inputPattern, {
         zone: ianaTz,
      }).toISO();

      return iso_dt;
   } catch (error) {
      await log('error', jobId, 'generateDateTimeObject', 'FN CATCH', {
         dtString: dtString,
         inputPattern: inputPattern,
         ianaTz: ianaTz,
      });
      return null;
   }
};

module.exports = generateDateTimeObject;
