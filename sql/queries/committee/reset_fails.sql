UPDATE Committee SET (
    fails
) = (
    0
) WHERE committee_id=$1::INTEGER RETURNING *;
