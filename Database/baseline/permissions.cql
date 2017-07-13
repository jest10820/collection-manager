CREATE USER IF NOT EXISTS user_api WITH PASSWORD '1234';
GRANT SELECT PERMISSION ON ksusers.users TO user_api;
GRANT SELECT PERMISSION ON ksusers.token_by_user TO user_api;
GRANT MODIFY PERMISSION ON ksusers.token_by_user TO user_api;
