INSERT INTO Institutes (
    institute_name,
    institute_logo,
    university_id
) VALUES (
    $1::TEXT,
    $2::TEXT,
    $3::INTEGER
)
RETURNING *;
