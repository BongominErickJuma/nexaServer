import express from "express";
import bodyParser from "body-parser";
// import assignments from "../assignments.js";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";

const assignments_app = express.Router();

assignments_app.use(bodyParser.urlencoded({ extended: true }));
assignments_app.use(bodyParser.json());

// assignments

// get all assignments
assignments_app.get("/assignments", async (req, res) => {
  const assignments = await getResources("assignment_timetable");
  const courses = await getResources("courses");
  res.json({
    assignments,
    courses,
  });
});

// get specific assignment
assignments_app.get("/assignments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignments = await getResources("assignment_timetable");
  const assignment = assignments.find((assignment) => assignment.id === id);
  if (!assignment) {
    return res.status(404).json({
      message: `assignment with id ${id} not found`,
    });
  } else {
    res.status(201).json(assignment);
  }
});

// add a new assignment
assignments_app.post("/assignments", async (req, res) => {
  const { unit_code, duedate, location, description } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO assignment_timetable (unit_code, duedate, location, description) VALUES($1, $2, $3, $4) RETURNING*`,
      [unit_code, duedate, location, description]
    );
    const assignment_timetable = result.rows[0];
    const assignments = await getResources("assignment_timetable");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "exam added successfully",
      assignment_timetable,
      assignments,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a assignment

assignments_app.patch("/assignments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { duedate, location, description } = req.body;
  try {
    const result = await db.query(
      `UPDATE assignment_timetable SET duedate = $1, location = $2, description= $3 WHERE id = $4 RETURNING*`,
      [duedate, location, description, id]
    );
    const assignment_timetable = result.rows[0];
    const assignments = await getResources("assignment_timetable");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "exam Updated successfully",
      assignment_timetable,
      assignments,
      courses,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete assignment

assignments_app.delete("/assignments/:id", async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM assignment_timetable WHERE id = $1 RETURNING*`,
      [parseInt(req.params.id, 10)]
    );
    const assignment_timetable = result.rows[0];
    const assignments = await getResources("assignment_timetable");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "assignment_timetable deleted successfully",
      assignment_timetable,
      courses,
      assignments,
    });
  } catch (error) {
    console.log(error);
  }
});

export default assignments_app;
