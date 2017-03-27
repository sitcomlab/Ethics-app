SELECT
    document_id,
    created,
    to_char(created, 'YYYY-MM-DD HH24:mm:ss') AS _created,
    updated,
    user_id,
    document_title,
    status
FROM Documents
WHERE user_id=$1::INTEGER
ORDER BY created DESC;
