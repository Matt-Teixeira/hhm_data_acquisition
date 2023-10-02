SELECT
    sys.id,
    json_agg(
        json_build_object(
            'system_id',
            log.system_id,
            'dir_name',
            log.dir_name,
            'file_name',
            log.file_name
        )
    ) AS log_config
FROM
    systems sys
    JOIN config.acquisition ac ON sys.id = ac.system_id
    JOIN config.log log ON sys.id = log.system_id
WHERE
    sys.manufacturer = 'Philips'
    AND sys.modality LIKE 'MRI'
    AND ac.acqu_point = 'mmb'
GROUP BY
    sys.id,
    ac.system_id;