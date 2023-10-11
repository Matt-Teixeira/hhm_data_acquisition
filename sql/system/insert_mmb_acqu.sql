INSERT INTO
    config.acquisition(
        system_id,
        mmb_ip,
        protocal,
        host,
        user_id
    )
VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5
    ) ON CONFLICT (system_id) DO
UPDATE
SET
    mmb_ip = $2,
    protocal = $3,
    host = $4,
    user_id = $5;