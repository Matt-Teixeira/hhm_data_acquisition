SELECT
    mmb_config -> 'rpp_configs' AS config_data
FROM
    systems
WHERE
    id = $1;