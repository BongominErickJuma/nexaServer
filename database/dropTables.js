import db from "./connect.js";

const dropTables = async () => {
  const tables = [
    "semester_timetable",
    "performance",
    "meetings",
    "exams",
    "course_notes",
    "assignment_timetable",
    "assignment_answers",
    "answered",
    "course_assignments",
    "courses",
    "teachers",
    "students",
  ];

  for (const table of tables) {
    try {
      await db.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
      console.log(`${table} table dropped successfully!`);
    } catch (err) {
      console.error(`Error dropping ${table} table:`, err.message);
    }
  }
};

export default dropTables;
