SELECT
    member_id,
    title,
    first_name,
    last_name,
    institute_id,
    research_group_id,
    office_room_number,
    office_phone_number,
    office_email_address,
    admin,
    subscribed
FROM Members
WHERE
        admin!=true
    /*
    AND
        deleted!=true
     */
ORDER BY admin DESC, last_name, first_name;
