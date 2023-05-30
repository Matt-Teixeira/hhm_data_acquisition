SELECT 
    am.*,
    u.he_level_units,
    u.he_pressure_units 
FROM alert.models       am
JOIN mag.ge_mm4_units   u   ON u.system_id = am.system_id
WHERE am.pg_table = 'mmb_ge_mm4' 
ORDER BY 
   am.system_id, 
   am.pg_table, 
   am.severity, 
   am.field_name;
