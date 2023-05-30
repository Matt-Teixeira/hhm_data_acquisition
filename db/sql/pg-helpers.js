const pgp = require('pg-promise')();

// HELPER FOR LINKING TO EXTERNAL QUERY FILES
const pg_tables = {
   ge: {
      mm3: new pgp.helpers.TableName({
         table: 'ge_mm3',
         schema: 'mag',
      }),
      mm3_units: new pgp.helpers.TableName({
         table: 'ge_mm3_units',
         schema: 'mag',
      }),
      mm4: new pgp.helpers.TableName({
         table: 'ge_mm4',
         schema: 'mag',
      }),
      mm4_units: new pgp.helpers.TableName({
         table: 'ge_mm4_units',
         schema: 'mag',
      }),
   },
   siemens: {
      default: new pgp.helpers.TableName({
         table: 'siemens',
         schema: 'mag',
      }),
      default_units: new pgp.helpers.TableName({
         table: 'siemens_units',
         schema: 'mag',
      }),
      non_tim: new pgp.helpers.TableName({
         table: 'siemens_non_tim',
         schema: 'mag',
      }),
      non_tim_units: new pgp.helpers.TableName({
         table: 'siemens_non_tim_units',
         schema: 'mag',
      }),
   },
   // philips: new pgp.helpers.TableName({
   //    table: 'philips_mri_monitoring_data_agg',
   //    schema: 'mag',
   // }),
   philips: {
      monitoring_agg: new pgp.helpers.TableName({
         table: 'philips_mri_monitoring_data_agg',
         schema: 'mag',
      }),
      monitoring_units: new pgp.helpers.TableName({
         table: 'philips_mri_monitoring_data_units',
         schema: 'mag',
      }),
   },
   edu: {
      // v1: new pgp.helpers.TableName({ table: 'v1', schema: 'edu' }),
      v2: new pgp.helpers.TableName({ table: 'v2', schema: 'edu' }),
      v2_units: new pgp.helpers.TableName({
         table: 'v2_units',
         schema: 'edu',
      }),
   },
   alert: {
      detections: new pgp.helpers.TableName({
         table: 'detections',
         schema: 'alert',
      }),
      notifications: new pgp.helpers.TableName({
         table: 'notifications',
         schema: 'alert',
      }),
      // DEV
      detections_dev_util_app: new pgp.helpers.TableName({
         table: 'detections_dev_util_app',
         schema: 'alert',
      }),
      notifications_dev_util_app: new pgp.helpers.TableName({
         table: 'notifications_dev_util_app',
         schema: 'alert',
      }),
   },
   util: {
      app_run_logs: new pgp.helpers.TableName({
         table: 'app_run_logs',
         schema: 'util',
      }),
   },
};

const pg_column_sets = {
   alert: {
      detections: new pgp.helpers.ColumnSet(
         [
            'id',
            'run_id',
            'alert_model_id',
            'system_id',
            'pg_table',
            'field_name',
            'units_field_name',
            'operator',
            'threshold',
            'threshold_units',
            'threshold_offset',
            'severity',
            'resolved_field_content',
            'resolved_field_units',
            'resolved_threshold_content',
         ],
         {
            table: pg_tables.alert.detections,
         }
      ),
      notifications: new pgp.helpers.ColumnSet(
         [
            'id',
            'user_id',
            'email_status',
            'sms_status',
            'sms_sid',
            'alert_detection_ids',
         ],
         {
            table: pg_tables.alert.notifications,
         }
      ),
      // DEV
      detections_dev_util_app: new pgp.helpers.ColumnSet(
         [
            'run_id',
            'job_id',
            'alert_model_id',
            'system_id',
            'pg_table',
            'field_name',
            'units_field_name',
            'operator',
            'threshold',
            'threshold_units',
            'threshold_offset',
            'severity',
            'resolved_field_content',
            'resolved_field_units',
            'resolved_threshold_content',
            'row_id',
            'field_content',
            'field_name_alias',
            'alert_units',
            'capture_datetime',
            'log_msg',
         ],
         {
            table: pg_tables.alert.detections_dev_util_app,
         }
      ),
      notifications_dev_util_app: new pgp.helpers.ColumnSet(
         [
            'run_id',
            'job_id',
            'user_id',
            'email_status',
            'sms_status',
            'sms_sid',
            'alert_detection_ids',
         ],
         {
            table: pg_tables.alert.notifications_dev_util_app,
         }
      ),
   },
   util: {
      app_run_logs: new pgp.helpers.ColumnSet(
         ['app_name', 'run_id', 'verbose_log', 'warn_error_logs'],
         { table: pg_tables.util.app_run_logs }
      ),
   },
};

module.exports = { pg_tables, pg_column_sets };
