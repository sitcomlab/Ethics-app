UPDATE Responsibilities SET (
    updated,
    course_name,
    term,
    lecturer,
    institute_id
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::INTEGER
) WHERE responsibility_id=$1::INTEGER RETURNING *;
