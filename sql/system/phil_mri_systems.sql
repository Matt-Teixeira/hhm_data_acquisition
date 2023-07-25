SELECT
    id,
    hhm_config,
    hhm_file_config,
    mmb_config -> 'ssh' -> 'ip_address' AS ip_address,
    mmb_config -> 'ssh' -> 'user_id' AS user_id
from
    systems
WHERE
    hhm_config ->> 'data_acqu' = 'mmb' AND id = 'SME15809';