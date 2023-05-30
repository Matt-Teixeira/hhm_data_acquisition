SELECT 
      am.*,
      u.helium_level_units
FROM  alert.models                              am
JOIN  mag.philips_mri_monitoring_data_units     u     ON u.system_id = am.system_id 
WHERE am.pg_table = 'philips_monitoring_agg' 
ORDER BY 
    am.system_id, 
    am.pg_table, 
    am.severity,
    am.field_name