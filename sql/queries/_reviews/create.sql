INSERT INTO Reviews (
    revision_id
) VALUES (
    $1::INTEGER
) RETURNING *;
