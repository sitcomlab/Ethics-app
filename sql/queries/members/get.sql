SELECT
    member.member_id,
    member.title,
    member.first_name,
    member.last_name,
    CONCAT(
        CASE
            WHEN member.title IS NOT NULL
            THEN CONCAT(member.title, ' ') END,
        CASE
            WHEN member.title IS NULL
            THEN '' END,
        member.first_name,
        ' ',
        member.last_name
    ) AS full_name,
    working_group.working_group_id,
    working_group.working_group_name,
    institute.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name,
    member.office_room_number,
    member.office_phone_number,
    member.office_email_address,
    member.subscribed,
    member.admin,
    member.former
FROM Members member
    JOIN Working_Groups working_group ON working_group.working_group_id = member.working_group_id
    JOIN Institutes institute ON institute.institute_id = working_group.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
    member.member_id=$1::INTEGER;
