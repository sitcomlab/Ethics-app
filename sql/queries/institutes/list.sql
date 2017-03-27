SELECT
    institute.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name
FROM Institutes institute
    JOIN Universities university ON university.university_id = institute.university_id
ORDER BY institute_name ASC;
