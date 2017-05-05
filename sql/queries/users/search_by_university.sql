SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    user_id,
    created,
    updated,
    email_address,
    title,
    first_name,
    last_name,
    blocked,
    institute_id,
    institute_name,
    university_id,
    university_name
FROM (
    SELECT
        _user.user_id,
        _user.created,
        _user.updated,
        _user.email_address,
        _user.title,
        _user.first_name,
        _user.last_name,
        _user.blocked,
        institute.institute_id,
        institute.institute_name,
        university.university_id,
        university.university_name,
        (
	       to_tsvector('simple', COALESCE(string_agg(_user.title, ' '), '')) ||
	       to_tsvector('simple', _user.first_name) ||
	       to_tsvector('simple', _user.last_name) ||
           to_tsvector('english', COALESCE(string_agg(_user.email_address, ' '), ''))
	    ) AS search_text
    FROM Users _user
        JOIN Institutes institute ON institute.institute_id = _user.institute_id
        JOIN Universities university ON university.university_id = institute.university_id
    WHERE
        (
            CASE
                WHEN $4::TEXT='undefined' THEN (_user.blocked=true OR _user.blocked=false)
                ELSE _user.blocked=$4::BOOLEAN
            END
        )
        AND
            university.university_id=$5::INTEGER
    GROUP BY
        _user.user_id,
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
        WHEN $3::TEXT='name.asc' THEN (first_name, last_name) END ASC,
    CASE
        WHEN $3::TEXT='name.desc' THEN (first_name, last_name) END DESC
OFFSET $1
LIMIT $2;
