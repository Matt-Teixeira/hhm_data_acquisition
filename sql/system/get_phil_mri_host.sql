SELECT
    sys.id,
    sys.manufacturer,
    sys.modality,
    ac.host_ip,
    ac.acqu_point,
    ac.debian_server_path,
    ac.credentials_group,
    ac.acquisition_script
FROM
    systems sys
    JOIN config.acquisition ac ON sys.id = ac.system_id
WHERE
    sys.manufacturer = 'Philips'
    AND sys.modality LIKE 'MRI'
   AND ac.acqu_point = 'host';