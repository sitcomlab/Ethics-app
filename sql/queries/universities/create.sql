INSERT INTO Universities (
    university_name
) VALUES (
    $1::TEXT
)
RETURNING *;
