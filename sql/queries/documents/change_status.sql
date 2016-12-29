UPDATE Documents SET (
    updated,
    status
) = (
    now(),
    $2::INTEGER
) WHERE document_id=$1::TEXT RETURNING *;
