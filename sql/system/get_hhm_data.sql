SELECT
    pc.id,
    pc.manufacturer,
    pc.modality,
    ac.host_ip,
    ac.vpn,
    ac.acqu_point,
    ac.debian_server_path,
    ac.credentials_group,
    ac.acquisition_script,
    ac.host_path,
    ac.cerb_file
FROM
    systems pc
    JOIN config.acquisition ac ON pc.id = ac.system_id
WHERE
    manufacturer = $1
    AND modality LIKE $2
    AND process_log = true
    --AND pc.id IN ('SME00865', 'SME01442');
