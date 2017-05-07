UPDATE Working_Groups SET (
    updated,
    working_group_name,
    institute_id,
    former
) = (
    now(),
    $2::TEXT,
    $3::INTEGER,
    $4::BOOLEAN
)
WHERE
    working_group_id=$1::INTEGER RETURNING *;
