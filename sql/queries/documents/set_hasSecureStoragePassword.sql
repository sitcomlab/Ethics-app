UPDATE Documents
SET hasSecureStoragePassword = true
WHERE document_id=$1::TEXT;