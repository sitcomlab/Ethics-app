DELETE FROM Courses
WHERE
    course_id=$1::INTEGER;
