UPDATE Descriptions SET (
    updated,
    title,
    researcher,
    study_time,
    purpose,
    procedure,
    duration,
    risks,
    benefits
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::TEXT,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT
) WHERE description_id=$1::INTEGER RETURNING *;
