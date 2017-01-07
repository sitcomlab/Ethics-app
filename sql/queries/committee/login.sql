SELECT
    fails
FROM Committee
WHERE committee_id=$1::INTEGER AND password=crypt($2::TEXT, password);
