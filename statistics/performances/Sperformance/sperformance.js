import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../../database/dbfunctions.js";
import db from "../../../database/connect.js";
// import courseperformance from "../performance.js";

const performance_app = express.Router();

performance_app.use(bodyParser.urlencoded({ extended: true }));
performance_app.use(bodyParser.json());

// performance

// Get performance for a specific course
performance_app.get("/performance/:id", async (req, res) => {
  const performances = await getResources("performance");
  const courses = await getResources("courses");

  const { id } = req.params;

  // Filter performances for the given student id
  const performance = performances.filter(
    (performance) => performance.student_id === parseInt(id, 10)
  );

  // Check if any performance was found
  if (performance.length === 0) {
    return res.status(404).json({
      message: `Performance for student ${id} not found`,
    });
  }

  res.status(200).json({
    performance,
    courses,
  });
});

// Add a new assignment for a specific course
performance_app.post("/performance", async (req, res) => {
  const {
    id,
    unit_code,
    student_id,
    exams_id,
    assignments_id,
    marks,
    course_name,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO performance (unit_code, student_id, exams_id, assignments_id, marks, course_name) VALUES($1, $2, $3, $4, $5, $6) RETURNING*`,
      [unit_code, student_id, exams_id, assignments_id, marks, course_name]
    );

    if (result) {
      await db.query(
        `UPDATE assignment_answers SET status = $1 WHERE id = $2`,
        ["marked", id]
      );
      console.log("operated");
    }
    const performance = result.rows[0];

    res.status(200).json({
      message: "Performance added successfully",
      performance,
    });
  } catch (error) {
    console.log(error);
  }
});

export default performance_app;
