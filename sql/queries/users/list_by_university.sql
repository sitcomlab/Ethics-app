SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    _user.user_id,
    _user.email_address,
    _user.title,
    _user.first_name,
    _user.last_name,
    _user.blocked,
    institute.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name
FROM Users _user
    JOIN Institutes institute ON institute.institute_id = _user.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
        _user.blocked=$3::BOOLEAN
    AND
        university.university_id=$4::INTEGER
OFFSET $1::INTEGER
LIMIT $2::INTEGER;
