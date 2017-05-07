SELECT *
FROM Concerns
WHERE
    concern_id=$1::INTEGER;
