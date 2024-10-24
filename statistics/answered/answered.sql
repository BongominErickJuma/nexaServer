CREATE TABLE answered (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id),
    assignments_id INTEGER REFERENCES course_assignments(id),
    status VARCHAR(10) 
);

INSERT INTO answered (student_id,  assignments_id, status)
VALUES
( 23, 2, 'ans'),
( 23, 3, 'ans'),
( 23, 4, 'ans'),
( 23, 5, 'ans'),
( 23, 6, 'ans'),
( 23, 7, 'ans');