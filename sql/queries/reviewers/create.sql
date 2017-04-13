INSERT INTO Reviewers (
    revision_id,
    member_id
) VALUES (
    $1::INTEGER,
    $2::INTEGER
) RETURNING *;
