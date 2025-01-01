CREATE TABLE performance (
    id SERIAL PRIMARY KEY,
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    student_id INTEGER NOT NULL REFERENCES students(id),
    exams_id INTEGER REFERENCES exams(id),
    assignments_id INTEGER REFERENCES course_assignments(id),
    course_name VARCHAR(255),
    marks INTEGER NOT NULL 
);

INSERT INTO performance (unit_code, student_id, exams_id, assignments_id, course_name, marks)
VALUES
('CENG101', 23, null, 2, 75),
('CENG101', 23, null, 3, 90),
('CENG202', 23, null, 4, 60),
('CENG202', 23, null, 5, 88),
('CENG203', 23, null, 6, 52),
('CENG203', 23, null, 7, 76);