UPDATE Institutes SET (
    updated,
    institute_name,
    institute_logo,
    former
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::BOOLEAN
)
WHERE
    institute_id=$1::INTEGER
RETURNING *;
