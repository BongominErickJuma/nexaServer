CREATE TABLE assignment_timetable (
    id SERIAL PRIMARY KEY,
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    duedate DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO assignment_timetable (unit_code, duedate, location, description)
VALUES('CENG101','2024-10-10', 'Online','Complete algebra exercises on quadratic equations.' )