SELECT
    university_id,
    university_name
FROM Universities
WHERE
    university_id=$1::INTEGER;
