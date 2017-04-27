SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    document.document_id,
    document.created,
    document.updated,
    document.document_title,
    document.status,
    document.notes,
    revision.revision_id,
    revision.revision_created,
    revision.revision_version,
    course.course_id,
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
    JOIN Affiliations affiliation ON affiliation.document_id = document.document_id
    JOIN Courses course ON course.course_id = affiliation.course_id
    JOIN Institutes institute ON institute.institute_id = course.institute_id
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
    course.course_id=$4::INTEGER
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN document.created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN document.created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN document.updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN document.updated END DESC,
    CASE
        WHEN $3::TEXT='status.asc' THEN document.status END ASC,
    CASE
        WHEN $3::TEXT='status.desc' THEN document.status END DESC,
    CASE
        WHEN $3::TEXT='title.asc' THEN document.document_title END ASC,
    CASE
        WHEN $3::TEXT='title.desc' THEN document.document_title END DESC
OFFSET $1
LIMIT $2;
