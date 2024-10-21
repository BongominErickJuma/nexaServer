CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    image TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
);


INSERT INTO students (name, email, phone, image, password, role, status) VALUES
('John Doe', 'johndoe1@example.com', '555-1234', 'https://example.com/images/johndoe1.jpg', 'passwordhash1', 'student', 'online'),
('Jane Smith', 'janesmith1@example.com', '555-5678', 'https://example.com/images/janesmith1.jpg', 'passwordhash2', 'student', 'offline'),
('Michael Johnson', 'mjohnson@example.com', '555-8765', 'https://example.com/images/mjohnson.jpg', 'passwordhash3', 'student', 'online'),
('Emily Davis', 'edavis@example.com', '555-4321', 'https://example.com/images/edavis.jpg', 'passwordhash4', 'student', 'offline'),
('David Wilson', 'dwilson@example.com', '555-2345', 'https://example.com/images/dwilson.jpg', 'passwordhash5', 'student', 'online'),
('Sarah Lee', 'sarahlee@example.com', '555-3456', 'https://example.com/images/sarahlee.jpg', 'passwordhash6', 'student', 'offline'),
('Robert Brown', 'rbrown@example.com', '555-6543', 'https://example.com/images/rbrown.jpg', 'passwordhash7', 'student', 'online'),
('Jessica White', 'jwhite@example.com', '555-7654', 'https://example.com/images/jwhite.jpg', 'passwordhash8', 'student', 'offline'),
('Christopher Harris', 'charris@example.com', '555-8765', 'https://example.com/images/charris.jpg', 'passwordhash9', 'student', 'online'),
('Amanda Martin', 'amartin@example.com', '555-9876', 'https://example.com/images/amartin.jpg', 'passwordhash10', 'student', 'offline'),
('Kevin Clark', 'kclark@example.com', '555-4321', 'https://example.com/images/kclark.jpg', 'passwordhash11', 'student', 'online'),
('Laura Lewis', 'llewis@example.com', '555-5432', 'https://example.com/images/llewis.jpg', 'passwordhash12', 'student', 'offline'),
('James Walker', 'jwalker@example.com', '555-6543', 'https://example.com/images/jwalker.jpg', 'passwordhash13', 'student', 'online'),
('Megan Hall', 'mhall@example.com', '555-7654', 'https://example.com/images/mhall.jpg', 'passwordhash14', 'student', 'offline'),
('Daniel Allen', 'dallen@example.com', '555-8765', 'https://example.com/images/dallen.jpg', 'passwordhash15', 'student', 'online'),
('Sophia Young', 'syoung@example.com', '555-9876', 'https://example.com/images/syoung.jpg', 'passwordhash16', 'student', 'offline'),
('Matthew King', 'mking@example.com', '555-1234', 'https://example.com/images/mking.jpg', 'passwordhash17', 'student', 'online'),
('Olivia Scott', 'oscott@example.com', '555-5678', 'https://example.com/images/oscott.jpg', 'passwordhash18', 'student', 'offline'),
('Brandon Adams', 'badams@example.com', '555-2345', 'https://example.com/images/badams.jpg', 'passwordhash19', 'student', 'online'),
('Isabella Wright', 'iwright@example.com', '555-3456', 'https://example.com/images/iwright.jpg', 'passwordhash20', 'student', 'offline');
