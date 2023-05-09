const db = require('../../../db/pgPool');
const { log } = require('../../../logger');
const { boot } = require('./sql');

// GENERIC LOGGER FOR ANY QF CALL
const logQf = async (fn, qfArgs) => {
   await log('info', 'NA', fn, `FN CALL`, {
      qfArgs: qfArgs,
   });
};

const getOnBootData = async () => {
   await logQf('getOnBootData', null);

   try {
      return Promise.all([db.any(boot.getSystemsConfigs)]);
   } catch (error) {
      console.log(error);
      // TODO: I'M NOT SURE THIS CAN EVEN BE CALLED
      // CHECK VIA USING PG_DB = dev_ml
      throw new Error(`getOnBootData FN CATCH -> ${error.message}`, {
         cause: error,
      });
   }
};

module.exports = {
   getOnBootData,
};
