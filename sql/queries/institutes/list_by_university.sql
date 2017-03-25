SELECT *
FROM Institutes
WHERE university_id=$1::INTEGER;
ORDER BY institute_name;
