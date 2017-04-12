SELECT
    member.member_id,
    member.title,
    member.first_name,
    member.last_name,
    member.working_group_id,
    working_group.working_group_name,
    member.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name,
    member.office_room_number,
    member.office_phone_number,
    member.office_email_address,
    member.subscribed,
    member.admin,
    member.deleted
FROM Members member
    JOIN Working_Groups working_group ON working_group.working_group_id = member.working_group_id
    JOIN Institutes institute ON institute.institute_id = member.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE member.member_id=$1::INTEGER;
