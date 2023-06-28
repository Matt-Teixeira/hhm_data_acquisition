SELECT
    id,
    ip_address,
    hhm_config -> 'data_acquisition' AS data_acquisition,
    manufacturer,
    modality
FROM
    systems
WHERE
    id = $1;