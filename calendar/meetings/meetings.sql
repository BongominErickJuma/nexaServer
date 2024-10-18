CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO meetings (title, date, start_time, duration, location, description)
VALUES('Open Forum Discussion','2024-10-10', '10:00', 1, 'Hall 1', 'Q&A session with faculty and students.' )