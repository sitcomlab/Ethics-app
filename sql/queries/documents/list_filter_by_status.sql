SELECT
    document.document_id,
    document.created,
    document.updated,
    document.document_title,
    document.status,
    document.notes,
    revision.revision_id,
    revision.revision_created,
    revision.revision_version,
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
    JOIN (
    	SELECT
    		revision_id AS revision_id,
    		created AS revision_created,
    		document_id AS document_id,
    		version AS revision_version
    	FROM Revisions
        WHERE (document_id, version) IN (
            SELECT
                document_id,
                MAX(version)
            FROM Revisions
            GROUP BY document_id
        )
    ) revision ON document.document_id = revision.document_id
    JOIN Users _user ON document.user_id = _user.user_id
    JOIN Institutes institute ON institute.institute_id = _user.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
        _user.institute_id=$1::INTEGER
    AND
        document.status=$2::INTEGER
ORDER BY document.created;
