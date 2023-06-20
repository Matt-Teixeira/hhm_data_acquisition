SELECT
    id,
    ip_address,
    hhm_config -> 'data_acquisition' AS data_acquisition
FROM
    systems
WHERE
    id IN ($1);