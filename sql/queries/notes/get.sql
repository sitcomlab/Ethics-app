SELECT *
FROM Notes
WHERE
    note_id=$1::INTEGER;
