UPDATE Institutes SET (
    updated,
    institute_name,
    university_id
) = (
    now(),
    $2::TEXT,
    $3::INTEGER
) WHERE institute_id=$1::INTEGER RETURNING *;
