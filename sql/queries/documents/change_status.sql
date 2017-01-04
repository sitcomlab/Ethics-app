UPDATE Documents SET (
    updated,
    status
) = (
    now(),
    $2::INTEGER
) WHERE document_id=$1::TEXT
RETURNING
    document_id,
    created,
    updated,
    to_char(created, 'YYYY-MM-DD HH24:mm:ss') AS _created,
    to_char(updated, 'YYYY-MM-DD HH24:mm:ss') AS _updated,
    user_id,
    document_title,
    status
;
