SELECT
    -- member_id,
    email_address,
    -- password,
    title,
    first_name,
    last_name,
    institute_id,
    research_group_id,
    office_room_number,
    office_phone_number,
    office_email_address
    -- admin,
    -- subscribed,
    -- fails
FROM Members
WHERE subscribed=true;
