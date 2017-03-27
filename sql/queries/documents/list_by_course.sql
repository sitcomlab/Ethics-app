SELECT
    document.document_id,
    document.created,
    document.updated,
    document.document_title,
    document.status,
    document.notes,
    document.notes,
    -- revision.revision_id,
    -- revision.revision_created,
    revision.revision_version,
    course.course_id,
    user.email_address AS author_email_address,
    user.title AS author_title,
    user.first_name AS author_first_name,
    user.last_name AS author_last_name
FROM Documents
    INNER JOIN (
    	SELECT
    		-- revision_id AS revision_id,
    		-- created AS revision_created,
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
    INNER JOIN Users user ON document.user_id = user.user_id
    INNER JOIN Affiliations affiliation ON affiliation.document_id = document.document_id
    INNER JOIN Courses course ON course.course_id = affiliation.course_id
WHERE course.course_id=$1
ORDER BY user.last_name, user.first_name, document.created;
