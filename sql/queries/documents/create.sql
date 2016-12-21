INSERT INTO Documents (
    document_id,
    user_id,
    document_title
) VALUES (
    $1::TEXT,
    $2::INTEGER,
    $3::TEXT
) RETURNING *;
