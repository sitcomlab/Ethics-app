SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    working_group.working_group_id,
    working_group.created,
    working_group.updated,
    working_group.working_group_name,
    working_group.former,
    institute.institute_id,
    institute.institute_name,
    institute.university_id,
    university.university_name
FROM Working_Groups working_group
    JOIN Institutes institute ON institute.institute_id = working_group.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
    (
        CASE
            WHEN $4::TEXT='undefined' THEN (working_group.former=true OR working_group.former=false)
            ELSE working_group.former=$4::BOOLEAN
        END
    )
    AND
        working_group.institute_id=$5::INTEGER
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN working_group.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN working_group.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN working_group.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN working_group.updated END DESC,
    CASE
        WHEN $3::TEXT='name.asc' THEN working_group.working_group_name END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN working_group.working_group_name END DESC
OFFSET $1
LIMIT $2;
