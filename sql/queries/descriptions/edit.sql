UPDATE Descriptions SET (
    updated,
    used,
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
    $2::BOOLEAN,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::TEXT,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT,
    $10::TEXT
) WHERE description_id=$1::INTEGER RETURNING *;
