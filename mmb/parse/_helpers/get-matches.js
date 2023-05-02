const { log } = require('../../../logger');

const getMatches = async (jobId, dt, reading, regex) => {
   return new Promise((resolve, reject) => {
      try {
         const matches = [...reading.matchAll(regex)];
         resolve(matches);
      } catch (error) {
         log('error', jobId, 'getMatches', 'FN CATCH', {
            dt: dt,
            error: error,
         });
         reject(null);
      }
   });
};

module.exports = getMatches;
