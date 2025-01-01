import db from "./connect.js";

const createTables = async () => {
  const tables = [
    {
      query: `
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            phone VARCHAR(15),
            image TEXT,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            status VARCHAR(255) 
        );
      `,
      name: "students",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS teachers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            phone VARCHAR(15),
            image TEXT,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            status VARCHAR(255) 
        );
      `,
      name: "teachers",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS courses (
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
      `,
      name: "courses",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS course_assignments (
            id SERIAL PRIMARY KEY,
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            question TEXT NOT NULL
        );
      `,
      name: "course assignments",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS answered (
            id SERIAL PRIMARY KEY,
            student_id INTEGER NOT NULL REFERENCES students(id),
            assignments_id INTEGER REFERENCES course_assignments(id),
            status VARCHAR(10)
        );
      `,
      name: "answered",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS assignment_answers (
            id SERIAL PRIMARY KEY,
            assignments_id INTEGER NOT NULL REFERENCES course_assignments(id), 
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            student_id INTEGER NOT NULL REFERENCES students(id), 
            status VARCHAR(10),
            answer TEXT
        );
      `,
      name: "assignment answers",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS assignment_timetable (
            id SERIAL PRIMARY KEY,
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            duedate DATE NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL
        );
      `,
      name: "assignment timetable",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS course_notes (
            id SERIAL PRIMARY KEY,
            subject_id VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            chapter INT NOT NULL,
            title VARCHAR(255),
            content TEXT
        );
      `,
      name: "course notes",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS exams (
            id SERIAL PRIMARY KEY,
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            duration INTEGER NOT NULL,
            location TEXT NOT NULL
        );
      `,
      name: "exams",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS meetings (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            duration INTEGER NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL
        );
      `,
      name: "meetings",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS performance (
            id SERIAL PRIMARY KEY,
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            student_id INTEGER NOT NULL REFERENCES students(id),
            exams_id INTEGER REFERENCES exams(id),
            assignments_id INTEGER REFERENCES course_assignments(id),
            course_name VARCHAR(255),
            marks INTEGER NOT NULL
        );
      `,
      name: "performance",
    },
    {
      query: `
        CREATE TABLE IF NOT EXISTS semester_timetable (
            id SERIAL PRIMARY KEY,
            unit_code VARCHAR(10) NOT NULL REFERENCES courses(unit_code),
            day TEXT NOT NULL,
            start_time TIME NOT NULL,
            duration TEXT NOT NULL,
            room TEXT NOT NULL
        );
      `,
      name: "semester timetable",
    },
  ];

  for (const table of tables) {
    try {
      await db.query(table.query);
      console.log(`${table.name} table created successfully!`);
    } catch (err) {
      console.error(`Error creating ${table.name} table:`, err.message);
    }
  }
};

export default createTables;
