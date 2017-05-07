SELECT *
FROM Responsibilities
WHERE
    course_id=$1::INTEGER;
