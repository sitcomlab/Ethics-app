SELECT
    affiliation.affiliation_id,
    affiliation.course_id,
    course.course_name,
    course.year,
    course.term,
    CASE
        WHEN course.term
            THEN CONCAT('WT', course.year, '/', course.year+1)
            ELSE CONCAT('ST', course.year)
        END AS season,
    course.lecturer,
    course.institute_id
FROM Affiliations affiliation
    JOIN Courses course ON affiliation.course_id = course.course_id
WHERE affiliation.document_id=$1::TEXT;
