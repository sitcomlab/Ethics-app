SELECT
    document.document_id,
    document.created,
    document.updated,
    document.user_id,
    document.document_title,
    document.status
FROM Documents document
    INNER JOIN Users _user ON document.user_id = _user.user_id
WHERE _user.email_address=$1::TEXT
ORDER BY document_title;
