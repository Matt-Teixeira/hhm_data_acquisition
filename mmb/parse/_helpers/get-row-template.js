const { log } = require('../../../logger');
const pgSchemas = require('./pg-schemas');

const getRowTemplate = async (jobId, pgTable) => {
   await log('info', jobId, 'getRowTemplate', 'FN CALLED', null);

   let pgSchema = '';
   switch (pgTable) {
      case 'mmb_ge_mm3':
         pgSchema = pgSchemas.mmb_ge_mm3;
         break;
      case 'mmb_ge_mm4':
         pgSchema = pgSchemas.mmb_ge_mm4;
         break;
      case 'mmb_siemens':
         pgSchema = pgSchemas.mmb_siemens;
         break;
      case 'mmb_siemens_non_tim':
         pgSchema = pgSchemas.mmb_siemens_non_tim;
         break;
      case 'mmb_edu2':
         pgSchema = pgSchemas.mmb_edu2;
         break;
      default:
         await log(
            'warn',
            jobId,
            'getRowTemplate',
            'FN DETAILS -> NON-CONFORMANT DATA',
            {
               pgTable: pgTable,
            }
         );
         return null;
   }

   const rowTemplate = {};

   // ONLY USING THE COLUMN NAMES FOR NOW
   for (const key of Object.keys(pgSchema)) {
      rowTemplate[key] = null;
   }

   await log('info', jobId, 'getRowTemplate', 'FN DETAILS', {
      'rowTemplate LENGTH': Object.keys(rowTemplate).length,
      rowTemplate: rowTemplate,
   });

   return rowTemplate;
};

module.exports = getRowTemplate;
