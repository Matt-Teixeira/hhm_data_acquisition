SELECT * 
FROM alert.models
WHERE pg_table = 'mmb_edu2' 
-- WHERE pg_table = 'edu.v2' 
ORDER BY system_id, pg_table, severity, field_name;