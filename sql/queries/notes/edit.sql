UPDATE Notes SET (
    updated,
    note
) = (
    now(),
    $2::TEXT
)
WHERE
    note_id=$1::INTEGER
RETURNING *;
