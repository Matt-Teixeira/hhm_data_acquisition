SELECT
    pc.id,
    pc.manufacturer,
    pc.modality,
    ac.host_ip,
    ac.mmb_ip,
    ac.acqu_point,
    ac.debian_server_path,
    ac.credentials_group,
    ac.acquisition_script
FROM
    systems pc
    JOIN config.acquisition ac ON pc.id = ac.system_id
WHERE
    id = $1;