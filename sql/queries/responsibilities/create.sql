INSERT INTO Responsibilities (
    course_id,
    member_id
) VALUES (
    $1::INTEGER,
    $2::INTEGER
)
RETURNING *;
