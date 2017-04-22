SELECT *
FROM Revisions
WHERE
    revision_id=$1::INTEGER;
