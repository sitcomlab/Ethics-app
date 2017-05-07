SELECT *
FROM Comments
WHERE
    comment_id=$1::INTEGER;
