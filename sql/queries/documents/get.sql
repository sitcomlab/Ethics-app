SELECT
    document_id,
    created,
    updated,
    document_title,
    user_id,
    status
FROM Documents
WHERE document_id=$1::TEXT;
