INSERT INTO Descriptions (
    revision_id,
    language
) VALUES (
    $1::INTEGER,
    $2::languages
) RETURNING *;
