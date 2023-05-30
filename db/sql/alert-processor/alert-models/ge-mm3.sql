SELECT 
    am.*,
    u.he_level_units,
    u.he_pressure_units 
FROM alert.models       am
JOIN mag.ge_mm3_units   u   ON u.system_id = am.system_id
-- WHERE am.pg_table = 'mag.ge_mm3' 
WHERE am.pg_table = 'mmb_ge_mm3' 
ORDER BY 
   am.system_id, 
   am.pg_table, 
   am.severity, 
   am.field_name;