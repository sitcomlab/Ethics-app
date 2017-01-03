INSERT INTO Concerns (
    revision_id
) VALUES (
    $1::INTEGER
) RETURNING *;
