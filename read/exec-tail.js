const { log } = require('../logger');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const execTail = async (jobId, sme, tailShPath, tailArgs) => {
   // THIS FUNCTION READS THE NEW DATA FROM A RECENTLY RSYNC'D FILE
   await log('info', jobId, sme, 'execTail', 'FN CALL', {
      tailShPath: tailShPath,
      tailArgs: tailArgs,
   });

   // 10MB
   const execOptions = {
      maxBuffer: 1024 * 1024 * 10,
   };

   try {
      const { stdout: newData } = await execFile(
         tailShPath,
         tailArgs,
         execOptions
      );

      return newData;
   } catch (err) {
      await log('error', jobId, sme, 'execTail', 'FN CATCH', {
         error: err,
      });
      return null;
   }
};

module.exports = execTail;