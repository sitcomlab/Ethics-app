UPDATE Institutes SET (
    updated,
    institute_name,
    former
) = (
    now(),
    $2::TEXT,
    $3::BOOLEAN
)
WHERE
    institute_id=$1::INTEGER
RETURNING *;
