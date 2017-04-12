UPDATE Working_Groups SET (
    updated,
    working_group_name,
    institute_id
) = (
    now(),
    $2::TEXT,
    $3::INTEGER
) WHERE working_group_id=$1::INTEGER RETURNING *;
