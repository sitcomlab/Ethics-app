SELECT *
FROM Documents
WHERE user_id=$1::INTEGER
ORDER BY document_title;
