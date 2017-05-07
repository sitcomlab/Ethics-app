SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    member_id,
    created,
    updated,
    title,
    first_name,
    last_name,
    working_group_id,
    working_group_name,
    institute_id,
    institute_name,
    university_id,
    university_name,
    office_room_number,
    office_phone_number,
    office_email_address,
    subscribed,
    former
FROM (
    SELECT
        member.member_id,
        member.created,
        member.updated,
        member.title,
        member.first_name,
        member.last_name,
        working_group.working_group_id,
        working_group.working_group_name,
        institute.institute_id,
        institute.institute_name,
        university.university_id,
        university.university_name,
        member.office_room_number,
        member.office_phone_number,
        member.office_email_address,
        member.subscribed,
        member.former,
        (
	       to_tsvector('simple', COALESCE(string_agg(member.title, ' '), '')) ||
	       to_tsvector('simple', member.first_name) ||
	       to_tsvector('simple', member.last_name) ||
	       to_tsvector('english', COALESCE(string_agg(member.office_room_number, ' '), '')) ||
	       to_tsvector('english', COALESCE(string_agg(member.office_phone_number, ' '), '')) ||
	       to_tsvector('english', COALESCE(string_agg(member.office_email_address, ' '), ''))
	    ) AS search_text
    FROM Members member
        JOIN Working_Groups working_group ON working_group.working_group_id = member.working_group_id
        JOIN Institutes institute ON institute.institute_id = working_group.institute_id
        JOIN Universities university ON university.university_id = institute.university_id
    WHERE
        (
            CASE
                WHEN $4::TEXT='undefined' THEN (member.former=true OR member.former=false)
                ELSE member.former=$4::BOOLEAN
            END
        )
        AND
            university.university_id=$5::INTEGER
    GROUP BY
        member.member_id,
        working_group.working_group_id,
        working_group.working_group_name,
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
