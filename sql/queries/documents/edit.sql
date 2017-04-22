UPDATE Documents SET (
    updated,
    document_title
) = (
    now(),
    $2::TEXT
)
WHERE
    document_id=$1::TEXT
RETURNING *;
