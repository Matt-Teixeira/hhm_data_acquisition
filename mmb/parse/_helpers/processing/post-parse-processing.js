const { log } = require('../../../../logger');
const getHeliumValues = require('./get-helium-values');
const generateDateTimeObject = require('../../../process/generate-dt-object');

const postParseProcessing = async (
   jobId,
   sme,
   dt,
   reading,
   pgTable,
   rowTemplate
) => {
   await log('info', jobId, sme, 'postParseProcessing', 'FN CALLED', null);

   try {
      // GENERIC PROCESSING
      // UPDATE rowTemplate METADATA
      rowTemplate['capture_datetime'] = dt;
      rowTemplate['machine_id'] = sme;

      // SPECIFIC PROCESSING
      let hostTime;
      let hostDate;
      let isNonTim;
      switch (pgTable) {
         // GE MM3
         case 'mmb_ge_mm3':
            // ADD MISSING UNITS
            rowTemplate['he_level_units'] = '%';
            rowTemplate['water_flow_units'] = 'GPM';
            rowTemplate['water_temp_units'] = 'F';
            rowTemplate['shield_si410_units'] = 'K';
            rowTemplate['recon_ruo_units'] = 'K';
            rowTemplate['recon_si410_units'] = 'K';
            rowTemplate['coldhead_ruo_units'] = 'K';
            rowTemplate['he_pressure_units'] = 'PSI';
            rowTemplate['cs1_units'] = 'TBD';
            rowTemplate['cdc1_units'] = 'TBD';
            rowTemplate['ht_units'] = 'TBD';
            rowTemplate['hdc_units'] = 'TBD';
            rowTemplate['rf_units'] = 'TBD';
            rowTemplate['fm_units'] = 'TBD';
            rowTemplate['sm_units'] = 'TBD';
            rowTemplate['ec1_units'] = 'TBD';
            rowTemplate['ec2_units'] = 'TBD';
            rowTemplate['ec3_units'] = 'TBD';
            rowTemplate['ec4_units'] = 'TBD';
            rowTemplate['water_flow_2_units'] = 'GPM';
            rowTemplate['water_temp_2_units'] = 'F';
            rowTemplate['cs2_units'] = 'TBD';
            rowTemplate['cdc2_units'] = 'TBD';
            rowTemplate['cmp1a_units'] = 'TBD';
            rowTemplate['sc_pressure_units'] = 'TBD';

            // BUILD DATETIME ISO IF REFERENCES QA
            hostTime = rowTemplate['host_time']; // 21:14:02
            hostDate = rowTemplate['host_date']; // 28-Apr-22
            if (hostTime && hostDate) {
               rowTemplate['host_datetime'] = await generateDateTimeObject(
                  jobId,
                  sme,
                  `${hostDate}${hostTime}`,
                  'dd-MMM-yyHH:mm',
                  'America/New_York'
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T generateDateTimeObject`,
                  {
                     "rowTemplate['host_date']": rowTemplate['host_date'],
                     "rowTemplate['host_time']": rowTemplate['host_time'],
                  }
               );
            }
            break;

         // GE MM4
         case 'mmb_ge_mm4':
            // ADD MISSING UNITS
            rowTemplate['he_level_units'] = '%';
            rowTemplate['water_flow_units'] = 'gpm';
            rowTemplate['water_temp_units'] = 'F';
            rowTemplate['shield_si410_units'] = 'K';
            rowTemplate['recon_ruo_units'] = 'K';
            rowTemplate['recon_si410_units'] = 'K';
            rowTemplate['coldhead_ruo_units'] = 'K';
            rowTemplate['he_pressure_units'] = 'PSI';
            rowTemplate['case_temp_units'] = 'C';
            rowTemplate['cdc1_units'] = 'tbd';

            // BUILD DATETIME ISO IF REFERENCES QA
            hostTime = rowTemplate['host_time'];
            hostDate = rowTemplate['host_date'];
            if (hostTime && hostDate) {
               rowTemplate['host_datetime'] = await generateDateTimeObject(
                  jobId,
                  sme,
                  `${hostDate}${hostTime}`,
                  'ddMMyyHHmm',
                  'America/New_York'
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T generateDateTimeObject`,
                  {
                     "rowTemplate['host_date']": rowTemplate['host_date'],
                     "rowTemplate['host_time']": rowTemplate['host_time'],
                  }
               );
            }

            break;

         // SIEMENS
         case 'mmb_siemens':
            // ADD MISSING UNITS
            rowTemplate['battery_volts_units'] = 'V';
            rowTemplate['mag_psia_units'] = 'PSI';

            // BUILD DATETIME ISO IF REFERENCES QA
            hostTime = rowTemplate['host_time']; // 21:14:02
            hostDate = rowTemplate['host_date']; // 28-Apr-22
            if (hostTime && hostDate) {
               rowTemplate['host_datetime'] = await generateDateTimeObject(
                  jobId,
                  sme,
                  `${hostDate}${hostTime}`,
                  'dd-MMM-yyHH:mm:ss',
                  'America/New_York'
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T generateDateTimeObject`,
                  {
                     "rowTemplate['host_date']": rowTemplate['host_date'],
                     "rowTemplate['host_time']": rowTemplate['host_time'],
                  }
               );
            }

            // GET UNIT SPECIFIC HELIUM VALUES IF REFERENCES QA
            isNonTim = false;
            if (rowTemplate['he_params']) {
               await getHeliumValues(
                  jobId,
                  sme,
                  dt,
                  reading,
                  rowTemplate,
                  isNonTim
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T getHeliumValues`,
                  {
                     "rowTemplate['he_params']": rowTemplate['he_params'],
                  }
               );
            }
            break;

         case 'mmb_siemens_non_tim':
            // ADD MISSING UNITS
            rowTemplate['cca_cab_temp_units'] = 'C';
            rowTemplate['gpa_cab_temp_units'] = 'C';
            rowTemplate['shim_amps_units'] = 'A';
            rowTemplate['shim_volts_units'] = 'V';
            rowTemplate['shim_power_units'] = 'W';

            // BUILD DATETIME ISO IF REFERENCES QA
            hostTime = rowTemplate['host_time']; // 21:14:02
            hostDate = rowTemplate['host_date']; // 28-Apr-2022
            if (hostTime && hostDate) {
               rowTemplate['host_datetime'] = await generateDateTimeObject(
                  jobId,
                  sme,
                  `${hostDate}${hostTime}`,
                  'dd-MMM-yyyyHH:mm:ss',
                  'America/New_York'
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T generateDateTimeObject`,
                  {
                     "rowTemplate['host_date']": rowTemplate['host_date'],
                     "rowTemplate['host_time']": rowTemplate['host_time'],
                  }
               );
            }

            // GET UNIT SPECIFIC HELIUM VALUES IF REFERENCES QA
            isNonTim = true;
            if (rowTemplate['he_params']) {
               await getHeliumValues(
                  jobId,
                  sme,
                  dt,
                  reading,
                  rowTemplate,
                  isNonTim
               );
            } else {
               await log(
                  'warn',
                  jobId,
                  sme,
                  'postParseProcessing',
                  `FN DETAILS -> CAN'T getHeliumValues`,
                  {
                     "rowTemplate['he_params']": rowTemplate['he_params'],
                  }
               );
            }
            break;

         // EDU2
         case 'mmb_edu2':
            // ADD MISSING UNITS
            rowTemplate['temp_probe_0_units'] = 'F';
            rowTemplate['temp_probe_1_units'] = 'F';
            rowTemplate['room_humidity_units'] = '%';
            rowTemplate['room_temp_units'] = 'F';

            break;
         default:
            break;
      }
   } catch (error) {
      await log('error', jobId, sme, 'postParseProcessing', 'FN CATCH', {
         error: error,
      });
   }
};

module.exports = postParseProcessing;
