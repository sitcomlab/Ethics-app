SELECT DISTINCT language
FROM Descriptions
WHERE revision_id=$1::INTEGER;
