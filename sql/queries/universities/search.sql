SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    university_id,
    created,
    updated,
    university_name
FROM (
    SELECT
        university.university_id,
        university.created,
        university.updated,
        university.university_name,
        (
	       to_tsvector('english', university.university_name)
	    ) AS search_text
    FROM Universities university
    GROUP BY
		university.university_id
) p_search
WHERE
    p_search.search_text @@ to_tsquery('english', $4::TEXT)
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
        WHEN $3::TEXT='name.asc' THEN university_name END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN university_name END DESC
OFFSET $1
LIMIT $2;
