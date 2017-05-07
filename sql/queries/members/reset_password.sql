UPDATE Members SET (
    password
) = (
    crypt($2::TEXT, gen_salt('md5'))
)
WHERE
    member_id=$1::INTEGER
RETURNING
    member_id,
    created,
    updated,
    email_address,
    title,
    first_name,
    last_name,
    working_group_id,
    office_room_number,
    office_phone_number,
    office_email_address,
    admin,
    subscribed,
    former,
    admin
;
