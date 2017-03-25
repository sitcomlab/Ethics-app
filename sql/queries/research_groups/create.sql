INSERT INTO Research_Groups (
    research_group_name,
    institute_id
) VALUES (
    $1::TEXT,
    $2::INTEGER
) RETURNING *;
