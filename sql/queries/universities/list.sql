SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    university_id,
    university_name
FROM Universities
ORDER BY
    university_name ASC
OFFSET $1
LIMIT $2;
