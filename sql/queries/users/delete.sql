DELETE FROM Users
WHERE
    user_id=$1::INTEGER;
