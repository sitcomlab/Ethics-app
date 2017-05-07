SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    member.member_id,
    member.created,
    member.updated,
    member.title,
    member.first_name,
    member.last_name,
    working_group.working_group_id,
    working_group.working_group_name,
    institute.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name,
    member.office_room_number,
    member.office_phone_number,
    member.office_email_address,
    member.admin,
    member.subscribed,
    member.former
FROM Members member
    JOIN Working_Groups working_group ON working_group.working_group_id = member.working_group_id
    JOIN Institutes institute ON institute.institute_id = working_group.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
    (
        CASE
            WHEN $4::TEXT='undefined' THEN (member.former=true OR member.former=false)
            ELSE member.former=$4::BOOLEAN
        END
    )
    AND
        working_group.working_group_id=$5::INTEGER
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN member.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN member.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN member.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN member.updated END DESC,
    CASE
        WHEN $3::TEXT='name.asc' THEN (member.first_name, member.last_name) END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN (member.first_name, member.last_name) END DESC
OFFSET $1
LIMIT $2;
