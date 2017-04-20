SELECT
    institute.institute_id,
    institute.institute_name,
    institute.former,
    university.university_id,
    university.university_name
FROM Institutes institute
    JOIN Universities university ON university.university_id = institute.university_id
WHERE institute_id=$1::INTEGER;
