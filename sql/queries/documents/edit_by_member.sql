UPDATE Documents SET (
    document_title
) = (
    $2::TEXT
)
WHERE
    document_id=$1::TEXT
RETURNING *;
