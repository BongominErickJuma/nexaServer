import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";
import bcrypt from "bcrypt";
// import students from "../students.js";

const students_app = express.Router();
const saltRounds = 10;

students_app.use(bodyParser.urlencoded({ extended: true }));
students_app.use(bodyParser.json());

// STUDENTS

// get all students
students_app.get("/students", async (req, res) => {
  const students = await getResources("students");
  res.json({
    students,
  });
});

// get specific student
students_app.get("/students/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const students = await getResources("students");
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
students_app.post("/students", async (req, res) => {
  const { name, email, phone, role, password, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const students = await getResources("students");
    const isStudent = students.some((st) => st.name === name);
    if (isStudent) {
      return res.status(409).json({
        message: "Student Name already exists",
      });
    }

    const result = await db.query(
      "INSERT INTO students(name, email, phone, image, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*",
      [name, email, phone, image, hashedPassword, role]
    );

    const student = result.rows[0];
    const allStudents = await getResources("students");
    // teachers.push(teacher);
    res.status(200).json({
      message: "student added successfully",
      students: allStudents,
      student,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a student

students_app.patch("/students/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email, phone, image } = req.body;
  try {
    const result = await db.query(
      "UPDATE students SET name = $1, email = $2, phone = $3, image = $4 WHERE id = $5 RETURNING*",
      [name, email, phone, image, id]
    );
    const student = result.rows[0];
    const allStudents = await getResources("students");
    res.status(200).json({
      message: "student Updated successfully",
      students: allStudents,
      student,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete student

students_app.delete("/students/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await db.query(
      "DELETE FROM students WHERE id = $1 RETURNING*",
      [id]
    );
    const student = result.rows[0];
    const allStudents = await getResources("students");
    res.status(200).json({
      message: "student Deleted successfully",
      students: allStudents,
      student,
    });
  } catch (error) {
    console.log(error);
  }
});

export default students_app;
