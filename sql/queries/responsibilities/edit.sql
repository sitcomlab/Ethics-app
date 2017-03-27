UPDATE Responsibilities SET (
    updated,
    course_id,
    member_id
) = (
    now(),
    $2::INTEGER,
    $3::INTEGER
) WHERE responsibility_id=$1::INTEGER RETURNING *;
