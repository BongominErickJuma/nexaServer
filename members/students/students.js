import express from "express";
import bodyParser from "body-parser";
import students from "../students.js";

const students_app = express.Router();

students_app.use(bodyParser.urlencoded({ extended: true }));
students_app.use(bodyParser.json());

// STUDENTS

// get all students
students_app.get("/students", (req, res) => {
  res.json({
    students: students,
  });
});

// get specific student
students_app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((student) => student.id === id);
  if (!student) {
    return res.status(404).json({
      message: `Student with id ${id} not found`,
    });
  } else {
    res.status(201).json(student);
  }
});

// add a new student
students_app.post("/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    grade: req.body.grade,
    image: req.body.image,
    major: req.body.major,
    bio: req.body.bio,
  };
  students.push(student);
  res.status(200).json({
    message: "Student added successfully",
    student,
    students,
  });
});

// update a student

students_app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((student) => student.id === id);
  if (!student) {
    return res.status(404).json({
      message: `Student with id ${id} not found`,
    });
  }

  if (req.body.name) student.name = req.body.name;
  if (req.body.email) student.email = req.body.email;
  if (req.body.phone) student.phone = req.body.phone;
  if (req.body.image) student.image = req.body.image;

  res.status(200).json({
    message: "Student Updated successfully",
    student,
    students,
  });
});

// delete student

students_app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({
      message: `Student with id ${id} not found`,
    });
  }

  students.splice(studentIndex, 1);

  res.status(200).json({
    message: "Student Deleted successfully",
    students,
  });
});

export default students_app;
