UPDATE Reviewers SET (
    member_id,
    revision_id
) = (
    $1::INTEGER,
    $2::INTEGER
) WHERE reviewer_id=$1::INTEGER RETURNING *;
