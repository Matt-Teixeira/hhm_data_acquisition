const { log } = require('../../../logger');

const updateRowTemplateMatchValues = async (jobId, matches, rowTemplate) => {
   try {
      const groups = matches[0].groups;
      for (const [groupName, groupValue] of Object.entries(groups)) {
         rowTemplate[groupName] = groupValue;
      }
   } catch (error) {
      await log('error', jobId, 'updateRowTemplateMatchValues', 'FN CATCH', {
         error: error,
      });
   }
};

module.exports = updateRowTemplateMatchValues;
