INSERT INTO Users (
    email_address,
    title,
    first_name,
    last_name,
    university_id,
    institute_id
) VALUES (
    $1::TEXT,
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::INTEGER,
    $6::INTEGER
) RETURNING *;
