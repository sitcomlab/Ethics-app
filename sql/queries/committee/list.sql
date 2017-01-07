SELECT
    title,
    first_name,
    last_name,
    institute,
    research_lab,
    office_room_number,
    office_phone_number,
    office_email_address
FROM Committee
WHERE subscribed=true AND admin=false;
