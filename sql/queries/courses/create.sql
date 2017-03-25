INSERT INTO Courses (
    course_name,
    term,
    lecturer,
    institute_id
) VALUES (
    $1::TEXT,
    $2::TEXT,
    $3::TEXT,
    $4::INTEGER
) RETURNING *;
