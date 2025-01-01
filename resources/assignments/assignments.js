import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";
// import courseAssignments from "../assignments.js";

const course_assignments_app = express.Router();

course_assignments_app.use(bodyParser.urlencoded({ extended: true }));
course_assignments_app.use(bodyParser.json());

// ASSIGNMENTS

// Get all assignments
course_assignments_app.get("/course_assignments", async (req, res) => {
  const assignments = await getResources("course_assignments");
  const courses = await getResources("courses");
  res.json({
    assignments,
    courses,
  });
});

// Get assignments for a specific course
course_assignments_app.get(
  "/course_assignments/:unitCode",
  async (req, res) => {
    const assignments = await getResources("course_assignments");
    const courses = await getResources("courses");
    const ans = await getResources("answered");

    const unitCode = req.params.unitCode;

    const course = courses.find((c) => c.unit_code === unitCode);

    const assignment = assignments.filter(
      (assignment) => assignment.unit_code === unitCode
    );

    if (!assignment) {
      return res.status(404).json({
        message: `Assignments for course ${unitCode} not found`,
      });
    }
    res.status(201).json({
      assignment,
      course,
      ans,
    });
  }
);

// Add a new assignment for a specific course
course_assignments_app.post(
  "/course_assignments/:unitCode",
  async (req, res) => {
    const unitCode = req.params.unitCode;
    const { question } = req.body;
    try {
      const result = await db.query(
        `INSERT INTO course_assignments (unit_code, question) VALUES($1, $2) RETURNING*`,
        [unitCode, question]
      );
      const returnedAssignment = result.rows[0];
      const assignments = await getResources("course_assignments");
      const courses = await getResources("courses");

      const course = courses.find((c) => c.unit_code === unitCode);

      const assignment = assignments.filter(
        (assignment) => assignment.unit_code === unitCode
      );

      const ans = await getResources("answered");
      res.status(200).json({
        message: "Assignment added successfully",
        returnedAssignment,
        assignment,
        course,
        ans,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

course_assignments_app.patch("/course_assignments/:id", async (req, res) => {
  const { question, unitCode } = req.body;

  const updatedQuestion = question.question;

  try {
    const result = await db.query(
      `UPDATE course_assignments SET question = $1 WHERE id = $2 RETURNING*`,
      [updatedQuestion, parseInt(req.params.id, 10)]
    );
    const returnedAssignment = result.rows[0];
    const assignments = await getResources("course_assignments");

    const courses = await getResources("courses");

    const course = courses.find((c) => c.unit_code === unitCode);

    const assignment = assignments.filter(
      (assignment) => assignment.unit_code === unitCode
    );

    const ans = await getResources("answered");
    res.status(200).json({
      message: "Assignment updated successfully",
      returnedAssignment,
      assignment,
      course,
      ans,
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete an assignment
course_assignments_app.delete(
  "/course_assignments/:id/:unitCode",
  async (req, res) => {
    const unitCode = req.params.unitCode;
    try {
      const result = await db.query(
        `DELETE FROM course_assignments WHERE id = $1 RETURNING*`,
        [parseInt(req.params.id, 10)]
      );
      const returnedAssignment = result.rows[0];
      const assignments = await getResources("course_assignments");

      const courses = await getResources("courses");

      const course = courses.find((c) => c.unit_code === unitCode);

      const assignment = assignments.filter(
        (assignment) => assignment.unit_code === unitCode
      );

      const ans = await getResources("answered");

      res.status(200).json({
        message: "Assignment deleted successfully",
        returnedAssignment,
        assignment,
        course,
        ans,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export default course_assignments_app;
