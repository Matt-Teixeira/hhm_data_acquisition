SELECT
    id,
    hhm_config,
    hhm_file_config,
    mmb_config -> 'ssh' -> 'ip_address' AS ip_address
from
    systems
WHERE
    hhm_config ->> 'data_acqu' = 'mmb';