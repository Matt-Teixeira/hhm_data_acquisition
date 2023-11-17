INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME00896',
		'10.87.143.223',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME00896',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME00896',
		'gesys_RDMCOPCT.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01091',
		'10.87.143.205',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01091',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01091',
		'gesys_RDMCCT_2.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01091',
		'gesys_RE36A1600120YC.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01091',
		'gesys_ct99.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME00847',
		'10.189.19.63',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME00847',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME00847',
		'gesys_ct99.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME00847',
		'gesys_mcvct.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01429',
		'172.19.13.208',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01429',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01429',
		'gesys_CRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01431',
		'172.17.17.206',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01431',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01431',
		'gesys_LRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01432',
		'172.17.31.213',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01432',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01432',
		'gesys_LRDCT02.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01433',
		'10.136.23.201',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01433',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01433',
		'gesys_HRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01434',
		'172.18.46.33',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01434',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01434',
		'gesys_BRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >

INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01176',
		'10.60.70.33',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01176',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01176',
		'gesys__oc0.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME01435',
		'172.18.46.33',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME01435',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME01435',
		'gesys_BRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME00897',
		'10.87.143.204',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME00897',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME00897',
		'gesys_BRDCT01.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME14521',
		'10.75.10.247',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME14521',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME14521',
		'gesys_ct07.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME14522',
		'10.35.12.123',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME14522',
		'3',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME14522',
		'gesys_ct04.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12413',
		'10.20.32.39',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12413',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12413',
		'gesys_GEOPT660CT1.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12451',
		'10.64.88.60',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12451',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12451',
		'gesys_CTSEN.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12451',
		'gesys_ct99.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12412',
		'167.171.56.43',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12412',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12412',
		'gesys_gect1.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12408',
		'10.20.32.61',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12408',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12408',
		'gesys_GEBSCT1.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12446',
		'10.193.14.204',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12446',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12446',
		'gesys_GE-OPTIMA64.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12411',
		'10.120.5.213',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12411',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12411',
		'gesys_phrgect4.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12450',
		'10.64.68.24',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12450',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12450',
		'gesys_ct_eso.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12445',
		'10.210.148.7',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12450',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12445',
		'gesys_GECT1.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12444',
		'10.195.18.212',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12444',
		'3',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12444',
		'gesys_GECT1.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12443',
		'10.184.14.203',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12443',
		'2',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12443',
		'gesys_CT_GE_BEH_2.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12409',
		'10.20.32.34',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12409',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12409',
		'gesys_QUORTUGECTIC.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);

-- >
-- >
INSERT INTO
	config.acquisition(
		system_id,
		host_ip,
		mmb_ip,
		protocal,
		debian_server_path,
		credentials_group,
		acquisition_script,
		run_group,
		host,
		user_id,
		acqu_point
	)
VALUES
	(
		'SME12449',
		'10.41.11.70',
		NULL,
		'lftp',
		'/home/staging/hhm_data_acquisition/files/SME12449',
		'1',
		'ge_ct_22.sh',
		1,
		NULL,
		NULL,
		NULL
	);

INSERT INTO
	config.log (
		system_id,
		file_name,
		dir_name,
		regex_models,
		pg_tables,
		column_name,
		agg
	)
VALUES
(
		'SME12449',
		'gesys_QUORTUGECTIC.log',
		'gesys',
		ARRAY ['block', 'sub_block'],
		ARRAY ['ge_ct_gesys'],
		NULL,
		NULL
	);