SELECT
    Documents.document_id,
    Documents.created,
    Documents.updated,
    Documents.document_title,
    Documents.status,
    Documents.notes,
    -- revisions.revision_id,
    -- revisions.revision_created,
    revisions.revision_version,
    Users.email_address AS author_email_address,
    Users.title AS author_title,
    Users.first_name AS author_first_name,
    Users.last_name AS author_last_name
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
    ) revisions ON Documents.document_id = revisions.document_id
    INNER JOIN Users ON Documents.user_id=Users.user_id
ORDER BY Users.last_name, Users.first_name, Documents.created;
