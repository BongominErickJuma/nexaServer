-- Create a table for storing course notes with teacher relationship
CREATE TABLE course_notes (
    id SERIAL PRIMARY KEY,
    subject_id VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    chapter INT NOT NULL,
    title VARCHAR(255),
    content TEXT
);

-- Insert data into the course_notes table with teacher relationship

-- Digital Logic Design (CENG101) - Taught by Dr. Sarah Okello (Assume teacher_id = 1)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG101', 1, 'Introduction to Boolean Algebra', 'This chapter introduces the basic principles of Boolean algebra...'),
('CENG101', 2, 'Combinational Logic Circuits', 'This chapter covers combinational logic circuits including AND, OR, and NOT gates...');

-- Microprocessor Systems (CENG202) - Taught by Prof. John Wamala (Assume teacher_id = 2)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG202', 1, 'Introduction to Microprocessor Architecture', 'This chapter provides an overview of microprocessor architecture...'),
('CENG202', 2, 'Assembly Language Programming', 'This chapter introduces the basics of assembly language programming...');

-- Signals and Systems (CENG203) - Taught by Dr. Grace Kintu (Assume teacher_id = 3)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG203', 1, 'Introduction to Continuous and Discrete-Time Signals', 'This chapter covers continuous and discrete-time signals...'),
('CENG203', 2, 'Fourier Transform', 'This chapter explains the basics of the Fourier transform and its applications...');

-- Computer Networks (CENG304) - Taught by Mr. Robert Ndawula (Assume teacher_id = 4)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG304', 1, 'OSI Model', 'This chapter covers the seven layers of the OSI model...'),
('CENG304', 2, 'TCP/IP Protocol Suite', 'This chapter explains the TCP/IP protocol suite and its importance in networking...');

-- Embedded Systems (CENG305) - Taught by Dr. Sandra Tendo (Assume teacher_id = 5)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG305', 1, 'Introduction to Embedded Systems', 'This chapter introduces the concept of embedded systems and their applications...'),
('CENG305', 2, 'Microcontroller Programming', 'This chapter explains the basics of programming microcontrollers for embedded systems...');

-- Software Engineering (CENG401) - Taught by Mr. Andrew Kalungi (Assume teacher_id = 6)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG401', 1, 'Introduction to Software Development Life Cycle (SDLC)', 'This chapter explains the various stages of the software development life cycle...'),
('CENG401', 2, 'Agile Development Methodologies', 'This chapter introduces the Agile approach to software development...');

-- Artificial Intelligence (CENG402) - Taught by Dr. Pauline Nakitende (Assume teacher_id = 7)
INSERT INTO course_notes (subject_id, chapter, title, content)
VALUES
('CENG402',  1, 'Introduction to Artificial Intelligence', 'This chapter gives an overview of artificial intelligence and its subfields...'),
('CENG402',  2, 'Machine Learning Basics', 'This chapter introduces the basics of machine learning and its algorithms...');
