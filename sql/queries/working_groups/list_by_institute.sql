SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    working_group.working_group_id,
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
        working_group.former=$3::BOOLEAN
    AND
        working_group.institute_id=$4::INTEGER
ORDER BY
    working_group_name
OFFSET $1
LIMIT $2;
