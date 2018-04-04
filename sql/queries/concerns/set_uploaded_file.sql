UPDATE Concerns SET (
    updated,
    q14_filename,
    q14_filepath
) = (
    now(),
    $2::TEXT,
    $3::TEXT
)
WHERE
    concern_id=$1::INTEGER
RETURNING *;
