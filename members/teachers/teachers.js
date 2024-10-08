import express from "express";
import bodyParser from "body-parser";
import teachers from "../teachers.js";

const teachers_app = express.Router();

teachers_app.use(bodyParser.urlencoded({ extended: true }));
teachers_app.use(bodyParser.json());

// TEACHERS

// get all teachers
teachers_app.get("/teachers", (req, res) => {
  res.json({
    teachers: teachers,
  });
});

// get specific teacher
teachers_app.get("/teachers/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = teachers.find((teacher) => teacher.id === id);
  if (!teacher) {
    return res.status(404).json({
      message: `teacher with id ${id} not found`,
    });
  } else {
    res.status(201).json(teacher);
  }
});

// add a new teacher
teachers_app.post("/teachers", (req, res) => {
  const teacher = {
    id: teachers.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    image: req.body.image,
  };
  teachers.push(teacher);
  res.status(200).json({
    message: "teacher added successfully",
    teacher,
    teachers,
  });
});

// update a teacher

teachers_app.patch("/teachers/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = teachers.find((teacher) => teacher.id === id);
  if (!teacher) {
    return res.status(404).json({
      message: `teacher with id ${id} not found`,
    });
  }

  if (req.body.name) teacher.name = req.body.name;
  if (req.body.email) teacher.email = req.body.email;
  if (req.body.phone) teacher.phone = req.body.phone;
  if (req.body.subject) teacher.subject = req.body.subject;
  if (req.body.image) teacher.image = req.body.image;
  res.status(200).json({
    message: "teacher Updated successfully",
    teacher,
    teachers,
  });
});

// delete teacher

teachers_app.delete("/teachers/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacherIndex = teachers.findIndex((teacher) => teacher.id === id);
  if (teacherIndex === -1) {
    return res.status(404).json({
      message: `teacher with id ${id} not found`,
    });
  }

  teachers.splice(teacherIndex, 1);

  res.status(200).json({
    message: "teacher Deleted successfully",
    teachers,
  });
});

export default teachers_app;
