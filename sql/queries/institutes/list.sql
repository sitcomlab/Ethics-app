SELECT
    institute.institute_id,
    institute.institute_name,
    institute.default_option,
    university.university_id,
    university.university_name
FROM Courses course
    JOIN Institutes institute ON institute.institute_id = course.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
ORDER BY default_option DESC, institute_name ASC;
