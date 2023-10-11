UPDATE
    config.edu
SET
    regex_models = ARRAY_APPEND(regex_models, $1)
WHERE
    system_id = $2;