UPDATE Comments SET (
    updated,
    published
) = (
    now(),
    $2::BOOLEAN
) WHERE comment_id=$1::INTEGER RETURNING *;
