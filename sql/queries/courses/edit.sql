UPDATE Courses SET (
    updated,
    course_name,
    year,
    term,
    lecturer,
    institute_id
) = (
    now(),
    $2::TEXT,
    $3::INTEGER,
    $4::BOOLEAN,
    $5::TEXT,
    $6::INTEGER
)
WHERE
    course_id=$1::INTEGER
RETURNING *;
