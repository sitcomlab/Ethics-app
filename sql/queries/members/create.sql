INSERT INTO Members (
    email_address,
    password,
    title,
    first_name,
    last_name,
    working_group_id,
    office_room_number,
    office_phone_number,
    office_email_address,
    subscribed
) VALUES (
    $1::TEXT,
    crypt($2::TEXT, gen_salt('md5')),
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::INTEGER,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT,
    $10::BOOLEAN
)
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
    subscribed
;
