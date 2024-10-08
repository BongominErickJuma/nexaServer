import express from "express";
import bodyParser from "body-parser";
import exams from "../exams.js";

const exams_app = express.Router();

exams_app.use(bodyParser.urlencoded({ extended: true }));
exams_app.use(bodyParser.json());

// exams

// get all exams
exams_app.get("/exams", (req, res) => {
  res.json({
    exams: exams,
  });
});

// get specific exam
exams_app.get("/exams/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
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
exams_app.post("/exams", (req, res) => {
  const exam = {
    id: exams.length + 1,
    name: req.body.name,
    date: req.body.date,
    start_time: req.body.start_time,
    duration: req.body.duration,
    location: req.body.location,
  };
  exams.push(exam);
  res.status(200).json({
    message: "exam added successfully",
    exam,
    exams,
  });
});

// update a exam

exams_app.patch("/exams/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exam = exams.find((exam) => exam.id === id);
  if (!exam) {
    return res.status(404).json({
      message: `exam with id ${id} not found`,
    });
  }

  if (req.body.name) exam.name = req.body.name;
  if (req.body.date) exam.date = req.body.date;
  if (req.body.start_time) exam.start_time = req.body.start_time;
  if (req.body.duration) exam.duration = req.body.duration;
  if (req.body.location) exam.location = req.body.location;

  res.status(200).json({
    message: "exam Updated successfully",
    exam,
    exams,
  });
});

// delete exam

exams_app.delete("/exams/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const examIndex = exams.findIndex((exam) => exam.id === id);
  if (examIndex === -1) {
    return res.status(404).json({
      message: `exam with id ${id} not found`,
    });
  }

  exams.splice(examIndex, 1);

  res.status(200).json({
    message: "exam Deleted successfully",
    exams,
  });
});

export default exams_app;
