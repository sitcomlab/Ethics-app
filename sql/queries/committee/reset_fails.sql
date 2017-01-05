UPDATE Committee SET (
    fails
) = (
    0
) WHERE user_id=$1::INTEGER RETURNING *;
