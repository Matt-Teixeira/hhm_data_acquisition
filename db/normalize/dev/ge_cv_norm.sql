INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point)
VALUES (
	'SME00865',
	'10.121.151.228',
	NULL,
	'lftp',
	'/home/matt-teixeira/hep3/hhm_data_acquisition/files/SME00865',
	'7',
	'ge_cv_21.sh',
	1,
	NULL,
	NULL,
	NULL
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME00865',
	'sysError.log',
	'sysError',
	ARRAY['sys_error'],
	ARRAY['ge_cv_syserror'],
	NULL,
	NULL
);

-- >
-- >

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point)
VALUES (
	'SME01442',
	'172.19.13.249',
	NULL,
	'lftp',
	'/home/matt-teixeira/hep3/hhm_data_acquisition/files/SME01442',
	'7',
	'ge_cv_21.sh',
	1,
	NULL,
	NULL,
	NULL
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME01442',
	'sysError.log',
	'sysError',
	ARRAY['sys_error'],
	ARRAY['ge_cv_syserror'],
	NULL,
	NULL
);

-- >
-- >

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point)
VALUES (
	'SME16934',
	'10.45.1.165',
	NULL,
	'lftp',
	'/home/matt-teixeira/hep3/hhm_data_acquisition/files/SME16934',
	'7',
	'ge_cv_21.sh',
	1,
	NULL,
	NULL,
	NULL
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME16934',
	'sysError.log',
	'sysError',
	ARRAY['sys_error'],
	ARRAY['ge_cv_syserror'],
	NULL,
	NULL
);

-- >
-- >

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point)
VALUES (
	'SME16938',
	'10.45.1.203',
	NULL,
	'lftp',
	'/home/matt-teixeira/hep3/hhm_data_acquisition/files/SME16938',
	'7',
	'ge_cv_21.sh',
	1,
	NULL,
	NULL,
	NULL
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME16938',
	'sysError.log',
	'sysError',
	ARRAY['sys_error'],
	ARRAY['ge_cv_syserror'],
	NULL,
	NULL
);

-- >
-- >

INSERT INTO config.acquisition(system_id, host_ip, mmb_ip, protocal, debian_server_path, credentials_group, acquisition_script, run_group, host, user_id, acqu_point)
VALUES (
	'SME14285',
	'10.189.248.13',
	NULL,
	'lftp',
	'/home/matt-teixeira/hep3/hhm_data_acquisition/files/SME14285',
	'7',
	'ge_cv_21.sh',
	1,
	NULL,
	NULL,
	NULL
);

INSERT INTO config.log (system_id, file_name, dir_name, regex_models, pg_tables, column_name, agg)
VALUES(
	'SME14285',
	'sysError.log',
	'sysError',
	ARRAY['sys_error'],
	ARRAY['ge_cv_syserror'],
	NULL,
	NULL
);