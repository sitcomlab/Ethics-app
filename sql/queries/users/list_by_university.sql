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
        _user.blocked=$4::BOOLEAN
    AND
        university.university_id=$5::INTEGER
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN _user.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN _user.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN _user.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN _user.updated END DESC,
    CASE
        WHEN $3::TEXT='name.asc' THEN (_user.first_name, _user.last_name) END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN (_user.first_name, _user.last_name) END DESC
OFFSET $1::INTEGER
LIMIT $2::INTEGER;
