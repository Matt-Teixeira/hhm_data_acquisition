SELECT
    sys.id,
    ac.mmb_ip,
    ac.host,
    ac.user_id,
    json_build_object(
        'system_id',
        mag.system_id,
        'file_name',
        mag.file_name,
        'regex_models',
        mag.regex_models,
        'pg_tables',
        mag.pg_tables,
        'schedule',
        mag.schedule
    ) AS config
FROM
    systems sys
    JOIN config.acquisition ac ON sys.id = ac.system_id
    JOIN config.mag mag ON sys.id = mag.system_id
WHERE
    mag.schedule = $1
GROUP BY
    sys.id,
    ac.system_id,
    mag.system_id,
    mag.file_name,
    mag.regex_models,
    mag.pg_tables,
    mag.schedule;