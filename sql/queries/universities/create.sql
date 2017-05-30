INSERT INTO Universities (
    university_name,
    university_logo
) VALUES (
    $1::TEXT,
    $2::TEXT
)
RETURNING *;
