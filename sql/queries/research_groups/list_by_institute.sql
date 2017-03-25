SELECT *
FROM Research_Groups
WHERE institute_id=$1::INTEGER;
ORDER BY research_group_name;
