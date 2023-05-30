SELECT
    id,
    ip_address,
    hhm_config -> 'hhm_credentials_group' AS credential_id
FROM
    systems
WHERE
    hhm_config IS NOT NULL
    AND manufacturer = $1
    AND modality = $2;