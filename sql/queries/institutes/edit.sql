UPDATE Institutes SET (
    updated,
    institute_name,
    university_id,
    former
) = (
    now(),
    $2::TEXT,
    $3::INTEGER,
    $4::BOOLEAN
) WHERE institute_id=$1::INTEGER RETURNING *;
