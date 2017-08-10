SELECT
    reviewer.reviewer_id,
    reviewer.revision_id,
    member.member_id,
    member.title,
    member.first_name,
    member.last_name,
    CONCAT(
        CASE
            WHEN member.title IS NOT NULL
            THEN CONCAT(member.title, ' ') END,
        CASE
            WHEN member.title IS NULL
            THEN '' END,
        member.first_name,
        ' ',
        member.last_name
    ) AS full_name,
    member.former
FROM Reviewers reviewer
    JOIN Members member ON reviewer.member_id = member.member_id
WHERE
    reviewer.reviewer_id=$1::INTEGER;
