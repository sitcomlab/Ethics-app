UPDATE Universities SET (
    updated,
    university_name,
    university_logo
) = (
    now(),
    $2::TEXT,
    $3::TEXT
)
WHERE
    university_id=$1::INTEGER
RETURNING *;
