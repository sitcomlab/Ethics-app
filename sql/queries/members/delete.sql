DELETE FROM Members
WHERE
        member_id=$1::INTEGER
    AND
        secret != true;
