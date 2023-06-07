SELECT
    id,
    ip_address,
    hhm_config -> 'data_acquisition' AS data_acquisition
FROM
    systems
WHERE
    hhm_config IS NOT NULL
    AND manufacturer = $1
    AND modality = $2;