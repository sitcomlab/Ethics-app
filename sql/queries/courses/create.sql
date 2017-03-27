INSERT INTO Courses (
    course_name,
    year,
    term,
    lecturer,
    institute_id
) VALUES (
    $1::TEXT,
    $2::INTEGER,
    $3::BOOLEAN,
    $4::TEXT,
    $5::INTEGER
) RETURNING *;
