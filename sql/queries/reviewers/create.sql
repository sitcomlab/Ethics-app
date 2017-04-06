INSERT INTO Reviewers (
    member_id,
    revision_id
) VALUES (
    $1::INTEGER,
    $2::INTEGER
) RETURNING *;
