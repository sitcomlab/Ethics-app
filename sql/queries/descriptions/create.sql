INSERT INTO Descriptions (
    revision_id
) VALUES (
    $1::INTEGER
) RETURNING *;
