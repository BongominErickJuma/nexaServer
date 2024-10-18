CREATE TABLE semester_timetable (
    id SERIAL PRIMARY KEY,
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    day TEXT NOT NULL,
    start_time TIME NOT NULL,
    duration TEXT NOT NULL,
    room TEXT NOT NULL
);

INSERT INTO semester_timetable (unit_code, day, start_time, duration, room)
VALUES('CENG101','Monday', '10:00', 2, 'Room 1' )