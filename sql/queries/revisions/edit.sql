UPDATE Revisions SET (
    updated
) = (
    now()
) WHERE revision_id=$1::INTEGER RETURNING *;
