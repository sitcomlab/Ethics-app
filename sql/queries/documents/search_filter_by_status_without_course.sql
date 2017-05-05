SELECT
	COUNT(*) OVER()::NUMERIC AS full_count,
    document_id,
    created,
    updated,
    document_title,
   	status,
    note_id,
    note,
    revision_id,
    revision_created,
    revision_version,
    user_id,
    email_address,
    title,
    first_name,
    last_name,
    institute_id,
    institute_name,
    university_id,
    university_name,
    affiliation_id,
    course_id,
    course_name,
    year,
    term,
    season,
    lecturer
FROM (
	SELECT
	    document.document_id,
	    document.created,
	    document.updated,
	    document.document_title,
	    document.status,
	    _note.note_id,
	    _note.note,
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
	    university.university_name,
	    affiliation.affiliation_id,
	    course.course_id,
	    course.course_name,
	    course.year,
	    course.term,
	    CASE
	        WHEN course.term
	            THEN CONCAT('WT', course.year, '/', course.year+1)
	            ELSE CONCAT('ST', course.year)
	        END AS season,
	    course.lecturer,
	    (
	       to_tsvector('simple', document.document_id) ||
	       to_tsvector('english', document.document_title) ||
	       to_tsvector('simple', COALESCE(string_agg(_user.title, ' '), '')) ||
	       to_tsvector('simple', _user.first_name) ||
	       to_tsvector('simple', _user.last_name) ||
	       to_tsvector('english', _user.email_address) ||
	       to_tsvector('english', COALESCE(string_agg(course.course_name, ' '), '')) ||
	       to_tsvector('english', COALESCE(string_agg(course.lecturer, ' '), '')) ||
	       to_tsvector('english', COALESCE(string_agg(
	       		CASE
	       			WHEN course.term
	            	THEN CONCAT('WT', course.year, '/', course.year+1)
	            	ELSE CONCAT('ST', course.year)
	        	END, ' '), ''))
	    ) AS search_text
	FROM Documents document
	    JOIN Notes _note ON document.document_id = _note.document_id
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
	    LEFT JOIN Affiliations affiliation ON affiliation.document_id = document.document_id
	    LEFT JOIN Courses course ON course.course_id = affiliation.course_id
    WHERE
			_user.institute_id=$4::INTEGER
		AND
			document.status=$5::INTEGER
		AND
			course.course_id IS NULL
	GROUP BY
		document.document_id,
		_user.user_id,
		_note.note_id,
		revision.revision_id,
		revision.revision_created,
		revision.revision_version,
		institute.institute_name,
		institute.university_id,
		university.university_name,
		affiliation.affiliation_id,
		course.course_id
) p_search
WHERE
    p_search.search_text @@ to_tsquery('english', $6::TEXT)
ORDER BY
    CASE
        WHEN $3::TEXT='created.asc' THEN created END ASC,
    CASE
        WHEN $3::TEXT='created.desc' THEN created END DESC,
    CASE
        WHEN $3::TEXT='updated.asc' THEN updated END ASC,
    CASE
        WHEN $3::TEXT='updated.desc' THEN updated END DESC,
    CASE
        WHEN $3::TEXT='status.asc' THEN status END ASC,
    CASE
        WHEN $3::TEXT='status.desc' THEN status END DESC,
    CASE
        WHEN $3::TEXT='title.asc' THEN document_title END ASC,
    CASE
        WHEN $3::TEXT='title.desc' THEN document_title END DESC
OFFSET $1
LIMIT $2;
