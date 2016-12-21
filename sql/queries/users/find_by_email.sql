SELECT *
FROM Users
WHERE email_address=$1::TEXT;
