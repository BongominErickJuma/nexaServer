import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";
// import courses from "../courses.js";

const course_app = express.Router();

course_app.use(bodyParser.urlencoded({ extended: true }));
course_app.use(bodyParser.json());

// COURSES

// Get all courses
course_app.get("/courses", async (req, res) => {
  const courses = await getResources("courses");
  const teachers = await getResources("teachers");
  res.json({
    courses,
    teachers,
  });
});

// Get specific course by unitCode
course_app.get("/courses/:unitCode", async (req, res) => {
  const courses = await getResources("courses");
  const teachers = await getResources("teachers");

  const course = courses.find(
    (course) => course.unit_code === req.params.unitCode
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with unit code ${req.params.unitCode} not found`,
    });
  }
  const teacher = teachers.find((tr) => tr.id === course.teacher_id);

  res.status(200).json({ course, teacher, teachers });
});

// Add a new course
course_app.post("/courses", async (req, res) => {
  const {
    courseTitle,
    description,
    assessment,
    prerequisites,
    deliveryMode,
    unitCode,
    lecturer,
    semester,
    level,
    creditUnits,
  } = req.body;

  try {
    const courses = await getResources("courses");
    const isCourse = courses.some((c) => c.course_title === courseTitle);
    if (isCourse) {
      return res.status(409).json({
        message: "Course already exists",
      });
    }

    const result = await db.query(
      "INSERT INTO courses ( course_title, description, credit_units, unit_code, semester, level, assessment, prerequisites, delivery_mode, teacher_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING*",
      [
        courseTitle,
        description,
        creditUnits,
        unitCode,
        semester,
        level,
        assessment,
        prerequisites,
        deliveryMode,
        lecturer,
      ]
    );
    const course = result.rows[0];
    const allCourses = await getResources("courses");
    const teachers = await getResources("teachers");
    res.status(200).json({
      message: "Course added successfully",
      course,
      courses: allCourses,
      teachers,
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a course by unitCode
course_app.patch("/courses/:unitCode", async (req, res) => {
  const id = req.params.unitCode;
  const {
    course_title: courseTitle,
    description,
    assessment,
    prerequisites,
    delivery_mode: deliveryMode,
    unit_code: unitCode,
    teacher_id: lecturer,
    semester,
    level,
    credit_units: creditUnits,
  } = req.body;
  try {
    const result = await db.query(
      "UPDATE courses SET course_title = $1, description = $2, credit_units = $3, unit_code = $4, semester = $5, level = $6, assessment = $7, prerequisites = $8, delivery_mode = $9, teacher_id = $10 WHERE unit_code = $11 RETURNING*",
      [
        courseTitle,
        description,
        creditUnits,
        unitCode,
        semester,
        level,
        assessment,
        prerequisites,
        deliveryMode,
        lecturer,
        id,
      ]
    );
    const course = result.rows[0];
    const teachers = await getResources("teachers");
    const teacher = teachers.find((tr) => tr.id === course.teacher_id);
    res.status(200).json({
      message: "Course Updated successfully",
      course,
      teachers,
      teacher,
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a course by unitCode
course_app.delete("/courses/:unitCode", async (req, res) => {
  const id = req.params.unitCode;
  try {
    const result = await db.query(
      "DELETE FROM courses WHERE unit_code = $1 RETURNING*",
      [id]
    );
    const course = result.rows[0];
    const teachers = await getResources("teachers");
    const teacher = teachers.find((tr) => tr.id === course.teacher_id);
    res.status(200).json({
      message: "courses Deleted successfully",
      course,
      teacher,
      teachers,
    });
  } catch (error) {
    console.log(error);
  }
});

export default course_app;
