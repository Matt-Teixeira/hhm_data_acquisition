SELECT id, hhm_config, hhm_file_config from systems WHERE hhm_config->>'data_acqu' = 'mmb';
