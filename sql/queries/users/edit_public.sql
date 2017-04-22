UPDATE Users SET (
    updated,
    email_address,
    title,
    first_name,
    last_name,
    institute_id
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::INTEGER
)
WHERE
    user_id=$1::INTEGER
RETURNING *;
