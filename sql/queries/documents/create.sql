INSERT INTO Documents (
    document_id,
    document_title,
    user_id
) VALUES (
    $1::TEXT,
    $2::TEXT,
    $3::INTEGER
) RETURNING *;
