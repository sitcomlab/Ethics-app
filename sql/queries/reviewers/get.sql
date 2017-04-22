SELECT
    reviewer.reviewer_id,
    reviewer.revision_id,
    member.member_id,
    member.title,
    member.first_name,
    member.last_name
FROM Reviewers reviewer
    JOIN Members member ON reviewer.member_id = member.member_id
WHERE
    reviewer.reviewer_id=$1::INTEGER;
