SELECT
    fails
FROM Committee
WHERE user_id=$1 AND password=crypt($2, password);
