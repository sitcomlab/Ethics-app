SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    institute.institute_id,
    institute.created,
    institute.updated,
    institute.institute_name,
    institute.institute_logo,
    institute.former,
    university.university_id,
    university.university_name
FROM Institutes institute
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
    (
        CASE
            WHEN $4::TEXT='undefined' THEN (institute.former=true OR institute.former=false)
            ELSE institute.former=$4::BOOLEAN
        END
    )
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN institute.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN institute.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN institute.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN institute.updated END DESC,
    CASE
        WHEN $3::TEXT='name.asc' THEN institute.institute_name END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN institute.institute_name END DESC
OFFSET $1
LIMIT $2;
