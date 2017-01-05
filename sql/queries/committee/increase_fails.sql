UPDATE Committee SET (
    fails
) = (
    fails+1
) WHERE user_id=$1::INTEGER RETURNING *;
