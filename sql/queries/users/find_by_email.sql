SELECT
    user.user_id,
    user.email_address,
    user.title,
    user.first_name,
    user.last_name,
    user.institute_id,
    insitute.institute_name,
    university.university_id,
    university.university_name,
FROM Users user
    JOIN Institutes institute ON institute.institute_id = user.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE email_address=$1::TEXT;
