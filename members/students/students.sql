CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    image TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);


-- Insert data into teachers table
INSERT INTO students (name, email, phone, image, password, role) VALUES
('Emily Clark', 'emily.clark@student.eclasslink.edu', '+1234567893',  'images/team-2.jpg'),
('Matthew Davis', 'matthew.davis@student.eclasslink.edu', '+1234567894', 'images/team-4.jpg'),
('Olivia Brown', 'olivia.brown@student.eclasslink.edu', '+1234567895', 'images/team-5.jpg'),
('Ethan Johnson', 'ethan.johnson@student.eclasslink.edu', '+1234567891',  'images/team-1.jpg'),
('Jackson Miller', 'jackson.miller@student.eclasslink.edu', '+1234567891',  'images/team-1.jpg'),
('Sophia Smith', 'sophia.smith@student.eclasslink.edu', '+1234567892',  'images/team-3.jpg');
