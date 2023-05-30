const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

// HELPER FOR LINKING TO EXTERNAL QUERY FILES
const sql = (file) => {
   const fullPath = joinPath(__dirname, file); // generating full path;
   return new QueryFile(fullPath, { minify: true });
};

module.exports = {
   alert_processor: {
      get_new_data: sql('alert-processor/get-new-data.sql'),
      get_alert_models: {
         ge_mm3: sql('alert-processor/alert-models/ge-mm3.sql'),
         ge_mm4: sql('alert-processor/alert-models/ge-mm4.sql'),
         siemens: sql('alert-processor/alert-models/siemens.sql'),
         philips: sql('alert-processor/alert-models/philips-monitoring.sql'),
         edu_v2: sql('alert-processor/alert-models/edu-v2.sql'),
      },
   },
   alert_notify: {
      get_users: sql('alert-notify/get-users.sql'),
      get_alert_detections: sql('alert-notify/get-alert-detections.sql'),
      get_systems_metadata: sql('alert-notify/get-systems-metadata.sql'),
      update_notification_email: sql(
         'alert-notify/update-notification-email.sql'
      ),
      update_notification_sms: sql('alert-notify/update-notification-sms.sql'),
   },
};
