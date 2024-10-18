-- Create table for storing course assignments
CREATE TABLE course_assignments (
    id SERIAL PRIMARY KEY,
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    question TEXT NOT NULL
);

-- Insert data into course_assignments table

-- Digital Logic Design (CENG101)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG101', 'Design a 4-bit binary adder using basic logic gates (AND, OR, NOT). Provide a detailed explanation of your design process.'),
('CENG101', 'Convert the decimal number 29 to binary, hexadecimal, and octal.');

-- Microprocessor Systems (CENG202)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG202', 'Write an assembly language program for the 8086 microprocessor that adds two numbers stored in memory and displays the result.'),
('CENG202', 'Explain how the stack and the stack pointer work in microprocessors.');

-- Signals and Systems (CENG203)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG203', 'Find the Fourier transform of the following signal: x(t) = e^(-at)u(t), where u(t) is the unit step function.'),
('CENG203', 'Explain the difference between continuous-time and discrete-time signals with examples.');

-- Computer Networks (CENG304)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG304', 'Describe the OSI model and the functionality of each layer.'),
('CENG304', 'Explain the process of TCP three-way handshake in establishing a connection.');

-- Embedded Systems (CENG305)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG305',  'Design an embedded system that controls the speed of a DC motor using a microcontroller.'),
('CENG305', 'Explain the difference between hard real-time and soft real-time systems.');

-- Software Engineering (CENG401)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG401',  'Describe the waterfall model in software development. Highlight its advantages and disadvantages.'),
('CENG401', 'Explain the purpose of unit testing in software development.');

-- Artificial Intelligence (CENG402)
INSERT INTO course_assignments (unit_code, question)
VALUES
('CENG402', 'Describe the basic architecture of a neural network and explain the backpropagation algorithm.'),
('CENG402', 'What is the difference between supervised and unsupervised learning? Provide examples of algorithms used in each case.');
