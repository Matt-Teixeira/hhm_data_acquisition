INSERT INTO config.edu (system_id, file_name, pg_tables, schedule)
VALUES(
	$1,
	$2,
	ARRAY[$3], -- tables
	$4
);