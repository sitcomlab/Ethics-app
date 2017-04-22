UPDATE Users SET (
    updated,
    email_address,
    title,
    first_name,
    last_name,
    institute_id,
    blocked
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::INTEGER,
    $7::BOOLEAN
)
WHERE
    user_id=$1::INTEGER
RETURNING *;
