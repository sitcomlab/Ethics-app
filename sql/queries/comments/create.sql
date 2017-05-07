INSERT INTO Comments (
    revision_id
) VALUES (
    $1::INTEGER
)
RETURNING *;
