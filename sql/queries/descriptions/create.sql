INSERT INTO Descriptions (
    revision_id,
    language,
    title,
    researcher,
    study_time,
    purpose,
    procedure,
    duration,
    risks,
    benefits
) VALUES (
    $1::INTEGER,
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::TEXT,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT,
    $10::TEXT
) RETURNING *;
