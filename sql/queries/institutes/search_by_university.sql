SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    institute_id,
    created,
    updated,
    institute_name,
    former,
    university_id,
    university_name
FROM (
    SELECT
        institute.institute_id,
        institute.created,
        institute.updated,
        institute.institute_name,
        institute.former,
        university.university_id,
        university.university_name,
        (
	       to_tsvector('english', institute.institute_name)
	    ) AS search_text
    FROM Institutes institute
        JOIN Universities university ON university.university_id = institute.university_id
    WHERE
            (
                CASE
                    WHEN $4::TEXT='undefined' THEN (institute.former=true OR institute.former=false)
                    ELSE institute.former=$4::BOOLEAN
                END
            )
        AND
            institute.university_id=$5::INTEGER
    GROUP BY
        institute.institute_id,
        institute.institute_name,
        university.university_id,
        university.university_name
) p_search
    WHERE
        p_search.search_text @@ to_tsquery('english', $6::TEXT)
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
        WHEN $3::TEXT='name.asc' THEN institute_name END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN institute_name END DESC
OFFSET $1
LIMIT $2;
