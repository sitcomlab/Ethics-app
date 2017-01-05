SELECT
    Committee.user_id,
    Users.email_address,
    Users.title,
    Users.first_name,
    Users.last_name,
    Committee.subscribed,
    Committee.institute,
    Committee.research_lab,
    Committee.office_room_number,
    Committee.office_phone_number,
    Committee.office_fax_number
FROM Committee
    INNER JOIN Users ON Committee.user_id=Users.user_id
WHERE Committee.user_id=$1;
