SELECT
    m.member_id,
    m.title,
    m.first_name,
    m.last_name,
    m.research_group_id,
    r.research_group_name,
    m.institute_id,
    i.institute_name,
    u.university_id,
    u.university_name,
    m.office_room_number,
    m.office_phone_number,
    m.office_email_address,
    m.subscribed
FROM Members m
    JOIN Research_Groups r ON r.research_group_id = m.research_group_id
    JOIN Institutes i ON i.institute_id = m.institute_id
    JOIN Universities u ON u.university_id = i.university_id
WHERE m.member_id=$1::INTEGER;
