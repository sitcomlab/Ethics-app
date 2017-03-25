INSERT INTO Institutes (
    institute_name,
    university_id
) VALUES (
    $1::TEXT,
    $2::INTEGER
) RETURNING *;
