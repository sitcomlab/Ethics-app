SELECT *
FROM Revisions
WHERE
    document_id=$1::TEXT
ORDER BY
    version DESC;
