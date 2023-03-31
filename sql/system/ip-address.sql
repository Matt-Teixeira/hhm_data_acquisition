SELECT 
   mmb_config->'ssh'->'ip_address' AS ip_address
FROM 
   systems
WHERE 
   id = $1;