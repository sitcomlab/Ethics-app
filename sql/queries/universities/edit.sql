UPDATE Universities SET (
    updated,
    university_name
) = (
    now(),
    $2::TEXT
) WHERE university_id=$1::INTEGER RETURNING *;
