import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";
// import courseanswered from "../answered.js";

const answered_app = express.Router();

answered_app.use(bodyParser.urlencoded({ extended: true }));
answered_app.use(bodyParser.json());

// answered

// Get answered for a specific course
answered_app.get("/answered/:id", async (req, res) => {
  const ans = await getResources("answered");

  const { id } = req.params;

  // Filter ans for the given student id
  const answered = ans.filter(
    (answered) => answered.student_id === parseInt(id, 10)
  );

  // Check if any answered was found
  if (answered.length === 0) {
    return res.status(404).json({
      message: `answered for student ${id} not found`,
    });
  }

  res.status(200).json({
    answered,
  });
});

// Add a new assignment for a specific course
answered_app.post("/answered", async (req, res) => {
  const { student_id, assignments_id, status } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO answered (student_id, assignments_id, status) VALUES($1, $2, $3 RETURNING*`,
      [student_id, assignments_id, status]
    );

    const answered = result.rows[0];

    res.status(200).json({
      message: "answered added successfully",
      answered,
    });
  } catch (error) {
    console.log(error);
  }
});

export default answered_app;
