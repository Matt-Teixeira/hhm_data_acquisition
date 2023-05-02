SELECT
    *,
    mmb_config -> 'ssh' -> 'ip_address' AS ip_address,
    mmb_config -> 'ssh' -> 'user_id' AS user_id,
    hhm_config -> 'data_acqu' AS data_acquisition
FROM
    systems
WHERE
    process_mag IS TRUE
    OR process_edu IS TRUE
ORDER BY
    id;