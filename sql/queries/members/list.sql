SELECT
    member_id,
    created,
    updated,
    email_address,
    title,
    first_name,
    last_name,
    institute,
    research_lab,
    office_room_number,
    office_phone_number,
    office_email_address,
    admin,
    subscribed
FROM Members
ORDER BY admin DESC, last_name, first_name;
