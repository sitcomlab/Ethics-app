INSERT INTO Notes (
    document_id,
    note
) VALUES (
    $1::TEXT,
    NULL
)
RETURNING *;
