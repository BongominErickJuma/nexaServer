CREATE TABLE exams (
    id SERIAL PRIMARY KEY,
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    location TEXT NOT NULL
);

INSERT INTO exams (unit_code, date, start_time, duration, location)
VALUES('CENG101','2024-10-03', '10:00', 2, 'Exam Hall 1' )