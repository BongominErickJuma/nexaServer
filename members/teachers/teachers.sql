CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(15),
    image TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
);


INSERT INTO teachers (name, email, phone, image, password, role, status) VALUES
('Mark Anderson', 'manderson@example.com', '555-1234', 'https://example.com/images/team-1.jpg', 'passwordhash1', 'teacher', 'online'),
('Susan Taylor', 'staylor@example.com', '555-5678', 'https://example.com/images/team-2.jpg', 'passwordhash2', 'teacher', 'offline'),
('Peter Roberts', 'proberts@example.com', '555-8765', 'https://example.com/images/team-3.jpg', 'passwordhash3', 'teacher', 'online'),
('Laura Jackson', 'ljackson@example.com', '555-4321', 'https://example.com/images/team-4.jpg', 'passwordhash4', 'teacher', 'offline'),
('George Baker', 'gbaker@example.com', '555-2345', 'https://example.com/images/team-5.jpg', 'passwordhash5', 'teacher', 'online'),
('Linda Martinez', 'lmartinez@example.com', '555-3456', 'https://example.com/images/team-6.jpg', 'passwordhash6', 'teacher', 'offline'),
('James Perez', 'jperez@example.com', '555-6543', 'https://example.com/images/team-1.jpg', 'passwordhash7', 'teacher', 'online'),
('Mary Harris', 'mharris@example.com', '555-7654', 'https://example.com/images/team-2.jpg', 'passwordhash8', 'teacher', 'offline'),
('Joseph Clark', 'jclark@example.com', '555-8765', 'https://example.com/images/team-3.jpg', 'passwordhash9', 'teacher', 'online'),
('Barbara Lewis', 'blewis@example.com', '555-9876', 'https://example.com/images/team-4.jpg', 'passwordhash10', 'teacher', 'offline'),
('Michael Young', 'myoung@example.com', '555-4321', 'https://example.com/images/team-5.jpg', 'passwordhash11', 'teacher', 'online'),
('Patricia King', 'pking@example.com', '555-5432', 'https://example.com/images/team-6.jpg', 'passwordhash12', 'teacher', 'offline'),
('Daniel Hall', 'dhall@example.com', '555-6543', 'https://example.com/images/team-1.jpg', 'passwordhash13', 'teacher', 'online'),
('Sandra Wright', 'swright@example.com', '555-7654', 'https://example.com/images/team-2.jpg', 'passwordhash14', 'teacher', 'offline'),
('Steven Allen', 'sallen@example.com', '555-8765', 'https://example.com/images/team-3.jpg', 'passwordhash15', 'teacher', 'online'),
('Elizabeth Scott', 'escott@example.com', '555-9876', 'https://example.com/images/team-4.jpg', 'passwordhash16', 'teacher', 'offline'),
('Richard Adams', 'radams@example.com', '555-1234', 'https://example.com/images/team-5.jpg', 'passwordhash17', 'teacher', 'online'),
('Jennifer Hill', 'jhill@example.com', '555-5678', 'https://example.com/images/team-6.jpg', 'passwordhash18', 'teacher', 'offline'),
('Robert Nelson', 'rnelson@example.com', '555-2345', 'https://example.com/images/team-1.jpg', 'passwordhash19', 'teacher', 'online'),
('Jessica Green', 'jgreen@example.com', '555-3456', 'https://example.com/images/team-2.jpg', 'passwordhash20', 'teacher', 'offline');
