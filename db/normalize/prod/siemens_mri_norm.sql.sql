
INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point, file_version)
VALUES (
	'SME01118',
	'10.3.15.254',
	NULL,
	'lftp',
	'/home/prod/hhm_data_acquisition/files/SME01118',
	NULL,
	'siemens_80_data_grab.sh',
	1,
	NULL,
	NULL,
	NULL,
	'win_10'
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME01118',
	'Application.log',
	'Application',
	ARRAY['re_v1'], -- regex
	ARRAY['siemens_mri'], -- tables
	NULL,
	NULL
);

-->
-->


INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point, file_version)
VALUES (
	'SME01101',
	'10.180.42.251',
	NULL,
	'lftp',
	'/home/prod/hhm_data_acquisition/files/SME01101',
	NULL,
	'siemens_80_data_grab.sh',
	1,
	NULL,
	NULL,
	NULL,
	'win_10'
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME01101',
	'Application.log',
	'Application',
	ARRAY['re_v1'], -- regex
	ARRAY['siemens_mri'], -- tables
	NULL,
	NULL
);

-->
-->


INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point, file_version)
VALUES (
	'SME12753',
	'10.121.175.251',
	NULL,
	'lftp',
	'/home/prod/hhm_data_acquisition/files/SME12753',
	NULL,
	'siemens_80_data_grab.sh',
	1,
	NULL,
	NULL,
	NULL,
	'win_10'
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME12753',
	'Application.log',
	'Application',
	ARRAY['re_v1'], -- regex
	ARRAY['siemens_mri'], -- tables
	NULL,
	NULL
);

-->
-->

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point, file_version)
VALUES (
	'SME16343',
	'10.35.11.213',
	NULL,
	'lftp',
	'/home/prod/hhm_data_acquisition/files/SME16343',
	NULL,
	'siemens_443_data_grab.sh',
	1,
	NULL,
	NULL,
	NULL,
	'win_10'
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME16343',
	'Application.log',
	'Application',
	ARRAY['re_v1'], -- regex
	ARRAY['siemens_mri'], -- tables
	NULL,
	NULL
);

-->
-->

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point, file_version)
VALUES (
	'SME01918',
	'10.30.5.1',
	NULL,
	'lftp',
	'/home/prod/hhm_data_acquisition/files/SME01918',
	NULL,
	'siemens_443_data_grab.sh',
	1,
	NULL,
	NULL,
	NULL,
	'win_10'
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME01918',
	'Application.log',
	'Application',
	ARRAY['re_v1'], -- regex
	ARRAY['siemens_mri'], -- tables
	NULL,
	NULL
);

-->
-->