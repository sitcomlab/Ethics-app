UPDATE Documents SET (
    updated,
    document_title,
    notes
) = (
    now(),
    $2::TEXT,
    $3::TEXT
)
WHERE
    document_id=$1::TEXT
RETURNING *;
