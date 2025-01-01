import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";
import bcrypt from "bcrypt";
// import teachers from "../teachers.js";

const teachers_app = express.Router();
const saltRounds = 10;

teachers_app.use(bodyParser.urlencoded({ extended: true }));
teachers_app.use(bodyParser.json());

// TEACHERS

// get all teachers
teachers_app.get("/teachers", async (req, res) => {
  const teachers = await getResources("teachers");
  const courses = await getResources("courses");
  res.json({
    teachers,
    courses,
  });
});

// get specific teacher
teachers_app.get("/teachers/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teachers = await getResources("teachers");
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
teachers_app.post("/teachers", async (req, res) => {
  const { name, email, phone, role, password, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const teachers = await getResources("teachers");
    const isTeacher = teachers.some((tr) => tr.name === name);
    if (isTeacher) {
      return res.status(409).json({
        message: "Teacher Name already exists",
      });
    }

    const result = await db.query(
      "INSERT INTO teachers(name, email, phone, image, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*",
      [name, email, phone, image, hashedPassword, role]
    );
    const teacher = result.rows[0];
    const allTeachers = await getResources("teachers");
    // teachers.push(teacher);
    res.status(200).json({
      message: "teacher added successfully",
      teacher,
      teachers: allTeachers,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a teacher

teachers_app.patch("/teachers/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email, phone, role, image } = req.body;
  try {
    const result = await db.query(
      "UPDATE teachers SET name = $1, email = $2, phone = $3, role = $4, image = $5 WHERE id = $6 RETURNING*",
      [name, email, phone, role, image, id]
    );
    const teacher = result.rows[0];
    const allTeachers = await getResources("teachers");
    res.status(200).json({
      message: "teacher Updated successfully",
      teacher,
      teachers: allTeachers,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete teacher

teachers_app.delete("/teachers/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await db.query(
      "DELETE FROM teachers WHERE id = $1 RETURNING*",
      [id]
    );
    const teacher = result.rows[0];
    const allTeachers = await getResources("teachers");
    res.status(200).json({
      message: "teacher Deleted successfully",
      teacher,
      teachers: allTeachers,
    });
  } catch (error) {
    console.log(error);
  }
});

export default teachers_app;
