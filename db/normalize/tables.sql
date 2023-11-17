/* CREATE TABLE IF NOT EXISTS config.process_config(
 system_id TEXT PRIMARY KEY,
 manufacturer TEXT,
 modality TEXT,
 alt_data_source JSONB
 );
 */


CREATE TABLE IF NOT EXISTS config.acquisition(
	system_id TEXT PRIMARY KEY,
	host_ip inet,
	mmb_ip inet,
	protocal TEXT,
	debian_server_path TEXT,
	credentials_group TEXT,
	acquisition_script TEXT,
	run_group INT,
	host TEXT,
	user_id TEXT,
	acqu_point TEXT,
	file_version TEXT,
	alt_data_source JSONB,
	host_path TEXT,
	cerb_file TEXT
);

CREATE TABLE IF NOT EXISTS config.edu(
	system_id TEXT,
	file_name TEXT,
	regex_models TEXT [],
	pg_tables TEXT [],
	schedule INT,
	CONSTRAINT pk_edu_config PRIMARY KEY (system_id, file_name),
	CONSTRAINT fk_edu_config_id FOREIGN KEY (system_id) REFERENCES config.acquisition(system_id)
);

CREATE TABLE IF NOT EXISTS config.mag(
	system_id TEXT,
	file_name TEXT,
	dir_name TEXT,
	regex_models TEXT [],
	pg_tables TEXT [],
	column_name TEXT,
	schedule INT,
	agg TEXT,
	CONSTRAINT pk_mag_config PRIMARY KEY (system_id, file_name),
	CONSTRAINT fk_mag_config_id FOREIGN KEY (system_id) REFERENCES config.acquisition(system_id)
);

CREATE TABLE IF NOT EXISTS config.log(
	system_id TEXT,
	file_name TEXT,
	dir_name TEXT,
	regex_models TEXT [],
	pg_tables TEXT [],
	column_name TEXT,
	agg TEXT,
	CONSTRAINT pk_log_config PRIMARY KEY (system_id, file_name),
	CONSTRAINT fk_log_config_id FOREIGN KEY (system_id) REFERENCES config.acquisition(system_id)
);