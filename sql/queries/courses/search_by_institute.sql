SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    course_id,
    created,
    updated,
    course_name,
    year,
    term,
    season,
    lecturer,
    institute_id,
    institute_name,
    university_id,
    university_name
FROM (
    SELECT
        course.course_id,
        course.created,
        course.updated,
        course.course_name,
        course.year,
        course.term,
        CASE
            WHEN course.term
                THEN CONCAT('WT', course.year, '/', course.year+1)
                ELSE CONCAT('ST', course.year)
            END AS season,
        course.lecturer,
        course.institute_id,
        institute.institute_name,
        university.university_id,
        university.university_name,
        (
	       to_tsvector('english', course.course_name) ||
	       to_tsvector('english', course.year::TEXT) ||
           to_tsvector('english', CASE
               WHEN course.term
                   THEN 'WT'
                   ELSE 'ST'
               END
           ) ||
           to_tsvector('simple', CASE
               WHEN course.term
                   THEN CONCAT('WT', course.year, '/', course.year+1)
                   ELSE CONCAT('ST', course.year)
               END
           ) ||
           to_tsvector('simple', course.lecturer)
	    ) AS search_text
    FROM Courses course
        JOIN Institutes institute ON institute.institute_id = course.institute_id
        JOIN Universities university ON university.university_id = institute.university_id
    WHERE
        course.institute_id=$4::INTEGER
    GROUP BY
        course.course_id,
        course.institute_id,
        institute.institute_name,
        university.university_id,
        university.university_name
) p_search
    WHERE
        p_search.search_text @@ to_tsquery('english', $5::TEXT)
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN updated END DESC,
    CASE
        WHEN $3::TEXT='year.asc' THEN (year, course_name) END ASC,
    CASE
        WHEN $3::TEXT='year.desc' THEN (year, course_name) END DESC
OFFSET $1
LIMIT $2;
