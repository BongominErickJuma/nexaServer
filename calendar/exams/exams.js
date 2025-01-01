import express from "express";
import bodyParser from "body-parser";
// import exams from "../exams.js";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";

const exams_app = express.Router();

exams_app.use(bodyParser.urlencoded({ extended: true }));
exams_app.use(bodyParser.json());

// exams

// get all exams
exams_app.get("/exams", async (req, res) => {
  const exams = await getResources("exams");
  const courses = await getResources("courses");
  res.json({
    exams,
    courses,
  });
});

// get specific exam
exams_app.get("/exams/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exams = await getResources("exams");
  const exam = exams.find((exam) => exam.id === id);
  if (!exam) {
    return res.status(404).json({
      message: `exam with id ${id} not found`,
    });
  } else {
    res.status(201).json(exam);
  }
});

// add a new exam
exams_app.post("/exams", async (req, res) => {
  const { unit_code, date, start_time, duration, location } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO exams (unit_code, date, start_time, duration, location) VALUES($1, $2, $3, $4, $5) RETURNING*`,
      [unit_code, date, start_time, duration, location]
    );
    const Addedexams = result.rows[0];
    const exams = await getResources("exams");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "exam added successfully",
      exams,
      courses,
      Addedexams,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a exam

exams_app.patch("/exams/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date, start_time, duration, location } = req.body;
  try {
    const result = await db.query(
      `UPDATE exams SET date = $1, start_time = $2, duration = $3, location = $4 WHERE id = $5 RETURNING*`,
      [date, start_time, duration, location, id]
    );
    const Addedexams = result.rows[0];
    const exams = await getResources("exams");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "exam Updated successfully",
      exams,
      courses,
      Addedexams,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete exam

exams_app.delete("/exams/:id", async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM exams WHERE id = $1 RETURNING*`,
      [parseInt(req.params.id, 10)]
    );
    const Addedexams = result.rows[0];
    const exams = await getResources("exams");
    const courses = await getResources("courses");
    res.status(200).json({
      message: "exams deleted successfully",
      exams,
      courses,
      Addedexams,
    });
  } catch (error) {
    console.log(error);
  }
});

export default exams_app;
