SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    university.university_id,
    university.created,
    university.updated,
    university.university_name
FROM Universities university
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN university.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN university.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN university.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN university.updated END DESC,
    CASE
        WHEN $3::TEXT='name.asc' THEN university.university_name END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN university.university_name END DESC
OFFSET $1
LIMIT $2;
