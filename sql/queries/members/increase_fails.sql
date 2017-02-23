UPDATE Members SET (
    fails
) = (
    fails+1
) WHERE member_id=$1::INTEGER RETURNING *;
