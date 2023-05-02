const { log } = require('../logger');

const getFileSizeDelta = async (
   jobId,
   sme,
   mmbScript,
   fileSizeAfterRsync,
   redisClient
) => {
   // THIS FUNCTION CALCULATES THE DIFFERENCE IN THE PRE AND POST RSYNC FILE SIZES
   // AND RETURNS 2 VALUES, A BOOLEAN WHICH INDICATES IF THE JOB SHOULD CONTINUE
   // AND THE CHANGE IN FILE SIZE
   await log('info', jobId, sme, 'getFileSizeDelta', 'FN CALL', {
      fileSizeAfterRsync: fileSizeAfterRsync,
   });

   let fileSizeBeforeRsync = await redisClient.get(`${sme}.${mmbScript}.log`);

   await log('info', jobId, sme, 'getFileSizeDelta', 'FN DETAILS', {
      fileSizeBeforeRsync: fileSizeBeforeRsync,
   });

   // A NEW MACHINE WHICH HAS 'NEVER' HAD ITS FILE SIZE STORED IN REDIS WILL RETURN NULL
   if (fileSizeBeforeRsync === null) {
      await log(
         'info',
         jobId,
         sme,
         'getFileSizeDelta',
         'FN DETAILS -> NEW MACHINE OR POSSIBLE ERROR',
         null
      );
      return [true, fileSizeAfterRsync];
   }

   // CONVERT REDIS STRING VALUE TO INT FOR ARITHMETIC
   fileSizeBeforeRsync = parseInt(fileSizeBeforeRsync);

   const delta = fileSizeAfterRsync - fileSizeBeforeRsync;
   if (delta > 0) {
      await log(
         'info',
         jobId,
         sme,
         'getFileSizeDelta',
         'FN DETAILS -> FILE SIZE HAS INCREASED',
         { delta: delta }
      );
      return [true, delta];
   } else if (delta === 0) {
      await log(
         'info',
         jobId,
         sme,
         'getFileSizeDelta',
         'FN DETAILS -> FILE SIZE UNCHANGED',
         { delta: delta }
      );
      return [false, null];
   } else {
      await log(
         'warn',
         jobId,
         sme,
         'getFileSizeDelta',
         'FN DETAILS -> FILE SIZE HAS DECREASED',
         { delta: delta }
      );
      return [false, null];
   }
};

module.exports = getFileSizeDelta;