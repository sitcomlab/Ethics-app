SELECT *
FROM Courses
WHERE institute_id=$1::INTEGER;
ORDER BY course_name;
