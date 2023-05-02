const { log } = require('../../../../logger');
const getMatches = require('../get-matches');
const regexTags = require('../regex-maps');
const qaMatches = require('../qa-matches');

const getHeliumValues = async (
   jobId,
   sme,
   dt,
   reading,
   rowTemplate,
   isNonTim
) => {
   await log('info', jobId, sme, 'getHeliumValues', 'FN CALLED', {
      isNonTim: isNonTim,
      he_params: rowTemplate['he_params'],
   });

   // DERIVE AND SET ALL UNIT SPECIFIC VALUES
   let unitSpecificRegex;
   if (rowTemplate['he_params'].includes('%')) {
      unitSpecificRegex = isNonTim
         ? regexTags.RE_SIEMENS_NT_HE_VALUES_PER
         : regexTags.RE_SIEMENS_HE_VALUES_PER;
      rowTemplate['he_units'] = '%';
   } else if (rowTemplate['he_params'].includes('Ltrs')) {
      unitSpecificRegex = regexTags.RE_SIEMENS_HE_VALUES_LTS;
      rowTemplate['he_units'] = 'Ltrs';
   } else {
      await log(
         'warn',
         jobId,
         sme,
         'getHeliumValues',
         'FN DETAILS -> NON-CONFORMANT DATA',
         { dt: dt, reading: reading, heParams: rowTemplate['he_params'] }
      );
      // TRUNCATE BEING WE CAN'T DETERMINE UNITS
      return;
   }

   // GET UNIT SPECIFIC MATCH
   const heParamMatches = await getMatches(
      jobId,
      sme,
      dt,
      reading,
      unitSpecificRegex
   );

   // QA
   const failedQA = await qaMatches(
      jobId,
      sme,
      dt,
      reading,
      unitSpecificRegex,
      heParamMatches
   );
   if (failedQA) {
      // TRUNCATE IF QA FAILED
      return;
   }

   // DESTRUCTOR VALUES OFF MATCH GROUP
   const {
      he_param_1_value,
      he_param_2_value,
      he_alarm_low_value,
      he_alarm_high_value,
      he_warn_low_value,
      he_warn_high_value,
      he_level_1_value,
      he_level_2_value,
   } = heParamMatches[0].groups;

   // UPDATE rowTemplate
   rowTemplate['he_param_1_value'] = he_param_1_value;
   rowTemplate['he_param_2_value'] = he_param_2_value;
   rowTemplate['he_alarm_low_value'] = he_alarm_low_value;
   rowTemplate['he_alarm_high_value'] = he_alarm_high_value;
   rowTemplate['he_warn_low_value'] = he_warn_low_value;
   rowTemplate['he_warn_high_value'] = he_warn_high_value;
   rowTemplate['he_level_1_value'] = he_level_1_value;
   // he_level_2_value ONLY FOR MACHINES WHICH ARE NOT 'NON-TIM'
   if (!isNonTim) {
      rowTemplate['he_level_2_value'] = he_level_2_value; // NULL FOR Ltrs UNIT MACHINES
   }
};

module.exports = getHeliumValues;
