import express from "express";
import bodyParser from "body-parser";

import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";

const answers_app = express.Router();

answers_app.use(bodyParser.urlencoded({ extended: true }));
answers_app.use(bodyParser.json());

// Get answers for a specific course
answers_app.get("/answers/:unitCode", async (req, res) => {
  const unitCode = req.params.unitCode;
  const assignmentAnswers = await getResources("assignment_answers");
  const assignments = await getResources("course_assignments");
  const courses = await getResources("courses");

  const course = courses.find((c) => c.unit_code === unitCode);

  const questions = assignments.filter(
    (assignment) => assignment.unit_code === unitCode
  );

  const answers = assignmentAnswers.filter((aa) => aa.unit_code === unitCode);

  res.status(200).json({
    questions,
    answers,
    course,
  });
});

// Add a new answer for a specific course question
answers_app.post("/answers/:unitCode/:questionId", async (req, res) => {
  const { unitCode, questionId } = req.params;
  const { answer, student_id } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO assignment_answers (assignments_id, unit_code, answer, student_id) VALUES($1, $2, $3, $4) RETURNING*`,
      [parseInt(questionId, 10), unitCode, answer, parseInt(student_id, 10)]
    );
    const insertedAnswer = result.rows[0];
    if (insertedAnswer) {
      await db.query(
        `INSERT INTO answered (student_id, assignments_id, status) VALUES($1, $2, $3)`,
        [student_id, questionId, "ans"]
      );
    }

    const assignments = await getResources("course_assignments");
    const courses = await getResources("courses");
    const ans = await getResources("answered");

    const course = courses.find((c) => c.unit_code === unitCode);

    const assignment = assignments.filter(
      (assignment) => assignment.unit_code === unitCode
    );

    res.status(200).json({
      message: "New answer added successfully",
      insertedAnswer,
      assignment,
      course,
      ans,
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a specific answer for a specific course question
answers_app.patch("/answers/:answerId", async (req, res) => {
  const { answerId } = req.params;
  const { answer, unitCode } = req.body;
  const updatedAnswer = answer.answer;

  try {
    if (updatedAnswer) {
      const result = await db.query(
        `UPDATE assignment_answers SET answer = $1 WHERE id = $2 RETURNING*`,
        [updatedAnswer, parseInt(answerId, 10)]
      );
      const insertedAnswer = result.rows[0];

      const assignmentAnswers = await getResources("assignment_answers");
      const assignments = await getResources("course_assignments");
      const courses = await getResources("courses");

      const course = courses.find((c) => c.unit_code === unitCode);

      const questions = assignments.filter(
        (assignment) => assignment.unit_code === unitCode
      );

      const answers = assignmentAnswers.filter(
        (aa) => aa.unit_code === unitCode
      );

      res.status(200).json({
        message: "Answer updated successfully",
        insertedAnswer,
        questions,
        answers,
        course,
      });
    } else {
      const result = await db.query(
        `UPDATE assignment_answers SET status = $1 WHERE id = $2 RETURNING*`,
        ["marked", parseInt(answerId, 10)]
      );
      const insertedAnswer = result.rows[0];

      const assignmentAnswers = await getResources("assignment_answers");
      const assignments = await getResources("course_assignments");
      const courses = await getResources("courses");

      const course = courses.find((c) => c.unit_code === unitCode);

      const questions = assignments.filter(
        (assignment) => assignment.unit_code === unitCode
      );

      const answers = assignmentAnswers.filter(
        (aa) => aa.unit_code === unitCode
      );

      res.status(200).json({
        message: "Answer updated successfully",
        insertedAnswer,
        questions,
        answers,
        course,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete a specific answer for a specific course question
answers_app.delete("/answers/:answerId", async (req, res) => {
  const { answerId } = req.params;
  try {
    const result = await db.query(
      `DELETE FROM assignment_answers WHERE id = $1 RETURNING*`,
      [parseInt(answerId, 10)]
    );
    const answer = result.rows[0];
    res.status(200).json({
      message: "Answer deleted successfully",
      answer,
    });
  } catch (error) {
    console.log(error);
  }
});

export default answers_app;
