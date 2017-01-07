SELECT *
FROM Committee
WHERE email_address=$1::TEXT;
