CREATE TABLE hhm_creds(
    id SERIAL PRIMARY KEY,
    user_num VARCHAR(1),
    password VARCHAR(1),
    modality VARCHAR(3),
    iv VARCHAR(32),
    encrypted_data VARCHAR(64)
);
