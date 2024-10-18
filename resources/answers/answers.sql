-- Create table for storing course assignments
CREATE TABLE assignment_answers (
    id SERIAL PRIMARY KEY,
    assignments_id INTEGER NOT NULL REFERENCES course_assignments(id),
    unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
    answer TEXT NOT NULL
);

-- Digital Logic Design (CENG101)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(1, 'CENG101', 'Design a 4-bit binary adder using basic logic gates (AND, OR, NOT). Provide a detailed explanation of your design process.'),
(2, 'CENG101', 'Convert the decimal number 29 to binary, hexadecimal, and octal.');

-- Microprocessor Systems (CENG202)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(3, 'CENG202', 'Write an assembly language program for the 8086 microprocessor that adds two numbers stored in memory and displays the result.'),
(4, 'CENG202', 'Explain how the stack and the stack pointer work in microprocessors.');

-- Signals and Systems (CENG203)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(5, 'CENG203', 'Find the Fourier transform of the following signal: x(t) = e^(-at)u(t), where u(t) is the unit step function.'),
(6, 'CENG203', 'Explain the difference between continuous-time and discrete-time signals with examples.');

-- Computer Networks (CENG304)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(7, 'CENG304', 'Describe the OSI model and the functionality of each layer.'),
(8, 'CENG304', 'Explain the process of TCP three-way handshake in establishing a connection.');

-- Embedded Systems (CENG305)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(9, 'CENG305',  'Design an embedded system that controls the speed of a DC motor using a microcontroller.'),
(10, 'CENG305',  'Explain the difference between hard real-time and soft real-time systems.');

-- Software Engineering (CENG401)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(11,  'CENG401', 'Describe the waterfall model in software development. Highlight its advantages and disadvantages.'),
(12, 'CENG401', 'Explain the purpose of unit testing in software development.');

-- Artificial Intelligence (CENG402)
INSERT INTO assignment_answers (assignments_id, unit_code, answer)
VALUES
(13, 'CENG402', 'Describe the basic architecture of a neural network and explain the backpropagation algorithm.'),
(14, 'CENG402', 'What is the difference between supervised and unsupervised learning? Provide examples of algorithms used in each case.');
