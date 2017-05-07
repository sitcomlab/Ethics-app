UPDATE Members SET (
    fails
) = (
    0
)
WHERE
    member_id=$1::INTEGER
RETURNING *;
