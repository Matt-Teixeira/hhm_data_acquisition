SELECT 
      am.*,
      u.he_level_units,
      u.mag_psia_units,
      htv.mag_type_code,
      htv.full_volume 
FROM  alert.models             am
JOIN  mag.siemens_units        u     ON u.system_id = am.system_id 
JOIN  config.he_tank_volumes   htv   ON htv.system_id = am.system_id
WHERE am.pg_table = 'mmb_siemens' 
ORDER BY 
    am.system_id, 
    am.pg_table, 
    am.severity,
    am.field_name