INSERT INTO Revisions (
    document_id,
    version
) VALUES (
    $1::TEXT,
    $2::INTEGER
) RETURNING *;
