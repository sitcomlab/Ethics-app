SELECT *
FROM Descriptions
WHERE revision_id=$1::INTEGER AND language=$2::languages
ORDER BY revision_id DESC;
