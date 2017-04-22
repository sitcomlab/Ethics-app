INSERT INTO Users (
    email_address,
    title,
    first_name,
    last_name,
    institute_id
) VALUES (
    $1::TEXT,
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::INTEGER
)
RETURNING *;
