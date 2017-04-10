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
    _user.last_name
FROM Documents document
    INNER JOIN (
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
    INNER JOIN Users _user ON document.user_id = _user.user_id
WHERE document.user_id=$1
ORDER BY _user.last_name, _user.first_name, document.created;
