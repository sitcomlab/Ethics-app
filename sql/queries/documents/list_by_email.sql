SELECT
    Documents.document_id,
    Documents.created,
    Documents.updated,
    Documents.user_id,
    Documents.document_title,
    Documents.status
FROM Documents
    INNER JOIN Users ON Documents.user_id = Users.user_id
WHERE Users.email_address=$1::TEXT
ORDER BY document_title;
