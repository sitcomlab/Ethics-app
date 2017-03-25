UPDATE Research_Groups SET (
    updated,
    research_group_name,
    institute_id
) = (
    now(),
    $2::TEXT,
    $3::INTEGER
) WHERE research_group_id=$1::INTEGER RETURNING *;
