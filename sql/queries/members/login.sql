SELECT
    fails
FROM Members
WHERE member_id=$1::INTEGER AND password=crypt($2::TEXT, password);
