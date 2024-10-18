CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_title VARCHAR(255) NOT NULL,
    description TEXT,
    credit_units INTEGER NOT NULL,
    unit_code VARCHAR(20) UNIQUE NOT NULL,
    semester VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    assessment TEXT,
    prerequisites VARCHAR(255),
    delivery_mode VARCHAR(100),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- Insert data into courses table
INSERT INTO courses (
    course_title, description, credit_units, unit_code, semester, 
    level, assessment, prerequisites, delivery_mode, teacher_id
) VALUES
(
    'Digital Logic Design', 
    'This course covers the basics of digital logic circuits and systems. It includes Boolean algebra, combinational and sequential logic, and introduces digital systems design using hardware description languages (HDL).', 
    3, 
    'CENG101', 
    '1st Semester', 
    'Year 1', 
    'Assignments, Midterm Exam, Final Exam', 
    NULL, 
    'Lectures, Lab Practicals', 
    1
),
(
    'Microprocessor Systems', 
    'This course provides in-depth knowledge of microprocessor architecture, programming, and interfacing. Students will learn assembly language and use microcontrollers in practical applications.', 
    4, 
    'CENG202', 
    '2nd Semester', 
    'Year 2', 
    'Lab Assignments, Project, Final Exam', 
    'Digital Logic Design', 
    'Lectures, Lab Practicals', 
    2
),
(
    'Signals and Systems', 
    'This course introduces continuous and discrete-time signals and systems, Fourier analysis, and transforms. It is fundamental for understanding communications and control systems.', 
    3, 
    'CENG203', 
    '2nd Semester', 
    'Year 2', 
    'Homework, Quizzes, Final Exam', 
    'Calculus, Linear Algebra', 
    'Lectures, Tutorials', 
    3
),
(
    'Computer Networks', 
    'This course covers the fundamental principles of computer networking, including the OSI model, TCP/IP protocols, and network hardware. Students will learn how to design and manage networks.', 
    3, 
    'CENG304', 
    '1st Semester', 
    'Year 3', 
    'Group Project, Lab Work, Final Exam', 
    'Data Communications', 
    'Lectures, Lab Practicals', 
    4
),
(
    'Embedded Systems', 
    'The course focuses on the development and deployment of embedded systems using microcontrollers and real-time operating systems. Students will learn about system design, programming, and hardware interfacing.', 
    4, 
    'CENG305', 
    '1st Semester', 
    'Year 3', 
    'Lab Projects, Midterm Exam, Final Exam', 
    'Microprocessor Systems', 
    'Lectures, Lab Practicals', 
    5
),
(
    'Software Engineering', 
    'This course introduces software engineering principles, including software development life cycles, methodologies, requirements analysis, design, testing, and maintenance of software systems.', 
    3, 
    'CENG401', 
    '1st Semester', 
    'Year 4', 
    'Team Project, Assignments, Final Exam', 
    'Programming Fundamentals', 
    'Lectures, Project Work', 
    6
),
(
    'Artificial Intelligence', 
    'An introduction to artificial intelligence techniques including machine learning, neural networks, natural language processing, and computer vision. Students will develop AI-based solutions for real-world problems.', 
    3, 
    'CENG402', 
    '2nd Semester', 
    'Year 4', 
    'Research Paper, Projects, Final Exam', 
    'Algorithms and Data Structures', 
    'Lectures, Practical Sessions', 
    1
);
