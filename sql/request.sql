--? Return all course without sequences
SELECT c.id, c.main_title
FROM Course c
LEFT JOIN Sequence s ON c.id = s.course_id
WHERE s.id IS NULL;

--? Return all courses with your sequences
SELECT c.id AS course_id, c.main_title, c.description, s.id 
AS sequence_id, s.index, s.title 
AS sequence_title, s.containt 
FROM Course c 
INNER JOIN Sequence s ON c.id = s.course_id 
ORDER BY c.main_title, s.index;

--& Drop course by id 
DELETE FROM Sequence 
WHERE course_id = 'e6f817d7-3933-11ef-85a9-0242ac170002';