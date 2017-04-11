SELECT
    document.document_id,
    document.created,
    document.updated,
    document.document_title,
    document.status,
    document.notes,
    _user.user_id,
    _user.email_address,
    _user.title,
    _user.first_name,
    _user.last_name,
    _user.institute_id,
    institute.institute_name,
    institute.university_id,
    university.university_name
FROM Documents document
    JOIN Users _user ON document.user_id = _user.user_id
    JOIN Institutes institute ON institute.institute_id = _user.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE document_id=$1::TEXT;
