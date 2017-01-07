UPDATE Committee SET (
    fails
) = (
    fails+1
) WHERE committee_id=$1::INTEGER RETURNING *;
