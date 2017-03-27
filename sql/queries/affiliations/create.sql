INSERT INTO Affiliations (
    document_id,
    course_id
) VALUES (
    $1::TEXT,
    $2::INTEGER
) RETURNING *;
