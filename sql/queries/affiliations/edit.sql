UPDATE Affiliations SET (
    updated,
    document_id,
    course_id
) = (
    now(),
    $2::TEXT,
    $3::INTEGER
)
WHERE
    affiliation_id=$1::INTEGER
RETURNING *;
