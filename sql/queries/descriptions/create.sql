INSERT INTO Descriptions (
    revision_id,
    language,
    used
) VALUES (
    $1::INTEGER,
    $2::languages,
    $3::BOOLEAN
) RETURNING *;
