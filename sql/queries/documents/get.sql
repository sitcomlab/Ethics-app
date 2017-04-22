SELECT
    document.document_id,
    document.created,
    document.updated,
    document.document_title,
    document.status,
    document.user_id
FROM Documents document
WHERE
    document_id=$1::TEXT;
