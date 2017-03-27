SELECT
    course.course_id,
    course.course_name,
    course.term,
    course.lecturer,
    course.institute_id,
    institute.institute_name,
    university.university_id,
    university.university_name
FROM Courses course
    JOIN Institutes institute ON institute.institute_id = course.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE course.institute_id=$1::INTEGER
ORDER BY course_name;
