const { log } = require('../../logger');
const getRowTemplate = require('./_helpers/get-row-template');
const regexTags = require('./_helpers/regex-maps');
const getMatches = require('./_helpers/get-matches');
const qaMatches = require('./_helpers/qa-matches');
const updateRowTemplateMatchValues = require('./_helpers/update-row-template-match-values');
// PROCESSING
const postParseProcessing = require('./_helpers/processing/post-parse-processing');

const parseReadings = async (
   jobId,
   sme,
   dtReadings,
   pgTable,
   machineRegexTags
) => {
   await log('info', jobId, 'parseReadings', 'FN CALLED', {
      'dtReadings COUNT': dtReadings.length,
   });

   // BUILD ARRAY OF APPLICABLE REGEXES BY MATCHING machineRegexTags
   // AGAINST KEYS FROM regexTags
   // TODO: CHANGE LOOP
   const applicableRegexIDs = [];
   const applicableRegexs = [];
   for (const [id, regex] of Object.entries(regexTags)) {
      if (machineRegexTags.includes(id)) {
         applicableRegexIDs.push(id);
         applicableRegexs.push(regex);
      }
   }
   await log('info', jobId, 'parseReadings', 'FN DETAILS', {
      'REGEX IDS': Object.values(applicableRegexIDs),
   });
   // TODO: ADD CHECK FOR 0 LENGTH

   // ARRAY OF rowTemplate OBJECTS
   const rows = [];

   // PARSING
   for (const dtReading of dtReadings) {
      for (const [dt, reading] of Object.entries(dtReading)) {
         // EACH rowTemplate {} WILL BE POPULATED WITH K/V PAIRS
         // K -> PG COLUMN NAME / REGEX CAPTURE GROUP NAME
         // V -> REGEX MATCH VALUE(S)
         const rowTemplate = await getRowTemplate(jobId, pgTable);
         // PARSE
         for (const regex of applicableRegexs) {
            // GET MATCHES FOR ALL APPLICABLE REGEX MAPS
            const matches = await getMatches(jobId, dt, reading, regex);
            const failedQA = await qaMatches(
               jobId,
               dt,
               reading,
               regex,
               matches
            );

            // IF QA FAILED SKIP LOOP TO NEXT ITERATION
            if (failedQA) {
               continue;
            }

            // OTHERWISE PROGRESS TO REMAINING STEPS
            await updateRowTemplateMatchValues(jobId, matches, rowTemplate);
         }

         // TECHNICALLY 'PROCESSING', BUT REALLY CONVENIENT TO DO THIS HERE
         rowTemplate.system_id = sme;
         rowTemplate.capture_datetime = dt;

         await log('info', jobId, 'parseReadings', 'FN DETAILS', {
            'rowTemplate POST PARSE': rowTemplate,
         });

         // ADD ROW
         rows.push(rowTemplate);
      }
   }

   return rows;
};

module.exports = parseReadings;
