CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    image TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);


-- Insert data into teachers table
INSERT INTO teachers (name, email, phone, image, password, role) VALUES
('Alice Johnson', 'alice.johnson@eclasslink.edu', '+1234567890', 'images/team-6.jpg'),
('Robert Smith', 'robert.smith@eclasslink.edu', '+1234567891',  'images/team-1.jpg'),
('Megan Brown', 'megan.brown@eclasslink.edu', '+1234567892',  'images/team-3.jpg'),
('John Doe', 'john.doe@eclasslink.edu', '+1234567893',  'images/team-2.jpg'),
('Emma Davis', 'emma.davis@eclasslink.edu', '+1234567894', 'images/team-4.jpg'),
('Michael Lee', 'michael.lee@eclasslink.edu', '+1234567895', 'images/team-5.jpg');
