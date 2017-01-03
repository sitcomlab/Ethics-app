SELECT *
FROM Descriptions
WHERE revision_id=$1::INTEGER AND language=$2::languages;
