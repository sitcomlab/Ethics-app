INSERT INTO Working_Groups (
    working_group_name,
    institute_id
) VALUES (
    $1::TEXT,
    $2::INTEGER
)
RETURNING *;
