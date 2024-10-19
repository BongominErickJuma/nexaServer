-- List all tables in current database
\dt

-- Create a table
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    ...
);

-- Drop a table
DROP TABLE table_name;

-- Rename a table
ALTER TABLE old_table_name RENAME TO new_table_name;

-- Add a column
ALTER TABLE table_name ADD COLUMN column_name datatype;

-- Drop a column
ALTER TABLE table_name DROP COLUMN column_name;

-- Modify a column
ALTER TABLE table_name ALTER COLUMN column_name TYPE new_datatype;

-- List columns of a table
\d table_name

-- Insert data into a table
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);

-- Select all rows
SELECT * FROM table_name;

-- Select specific columns
SELECT column1, column2 FROM table_name;

-- Select with condition
SELECT * FROM table_name WHERE condition;

-- Update a record
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;

-- Delete a record
DELETE FROM table_name WHERE condition;


-- Sorting results
SELECT * FROM table_name ORDER BY column_name ASC|DESC;

-- Filtering results
SELECT * FROM table_name WHERE column_name = value;

-- Grouping results
SELECT column, COUNT(*) FROM table_name GROUP BY column;

-- Joining tables (INNER JOIN)
SELECT * FROM table1
INNER JOIN table2 ON table1.column = table2.column;

-- Left Join
SELECT * FROM table1
LEFT JOIN table2 ON table1.column = table2.column;

-- Right Join
SELECT * FROM table1
RIGHT JOIN table2 ON table1.column = table2.column;
-- Primary Key
CREATE TABLE table_name (
    id SERIAL PRIMARY KEY,
    column1 datatype
);

-- Foreign Key
CREATE TABLE table_name (
    id SERIAL,
    column1 datatype,
    column2 datatype,
    FOREIGN KEY (column2) REFERENCES other_table(id)
);

-- Unique Constraint
CREATE TABLE table_name (
    column1 datatype UNIQUE
);

-- List all users
\du

-- Create a new user
CREATE USER username WITH PASSWORD 'password';

-- Grant privileges to a user
GRANT ALL PRIVILEGES ON DATABASE dbname TO username;

-- Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE dbname FROM username;

-- Drop a user
DROP USER username;

