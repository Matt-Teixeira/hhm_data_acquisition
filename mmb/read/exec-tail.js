const { log } = require('../../logger');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const execTail = async (jobId, sme, tailShPath, tailArgs) => {
   try {
      // THIS FUNCTION READS THE NEW DATA FROM A RECENTLY RSYNC'D FILE
      await log('info', jobId, 'execTail', 'FN CALL', {
         sme: sme,
         tailShPath: tailShPath,
         tailArgs: tailArgs,
      });

      // 10MB
      const execOptions = {
         maxBuffer: 1024 * 1024 * 10,
      };

      const { stdout: newData } = await execFile(
         tailShPath,
         tailArgs,
         execOptions
      );

      return newData;
   } catch (error) {
      await log('error', jobId, 'execTail', 'FN CATCH', {
         error: error,
      });
      return null;
   }
};

module.exports = execTail;
