import express from "express";
import bodyParser from "body-parser";
import courses from "../courses.js";

const course_app = express.Router();

course_app.use(bodyParser.urlencoded({ extended: true }));
course_app.use(bodyParser.json());

// COURSES

// Get all courses
course_app.get("/courses", (req, res) => {
  res.json({
    courses,
  });
});

// Get specific course by unitCode
course_app.get("/courses/:unitCode", (req, res) => {
  const course = courses.find(
    (course) => course.unitCode === req.params.unitCode
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with unit code ${req.params.unitCode} not found`,
    });
  }
  res.status(200).json(course);
});

// Add a new course
course_app.post("/courses", (req, res) => {
  const course = {
    courseTitle: req.body.courseTitle,
    description: req.body.description,
    lecturer: req.body.lecturer,
    creditUnits: req.body.creditUnits,
    unitCode: req.body.unitCode,
    semester: req.body.semester,
    level: req.body.level,
    assessment: req.body.assessment,
    prerequisites: req.body.prerequisites,
    deliveryMode: req.body.deliveryMode,
  };
  courses.push(course);
  res.status(200).json({
    message: "Course added successfully",
    course,
    courses,
  });
});

// Update a course by unitCode
course_app.patch("/courses/:unitCode", (req, res) => {
  const course = courses.find(
    (course) => course.unitCode === req.params.unitCode
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with unit code ${req.params.unitCode} not found`,
    });
  }

  if (req.body.courseTitle) course.courseTitle = req.body.courseTitle;
  if (req.body.description) course.description = req.body.description;
  if (req.body.lecturer) course.lecturer = req.body.lecturer;
  if (req.body.creditUnits) course.creditUnits = req.body.creditUnits;
  if (req.body.semester) course.semester = req.body.semester;
  if (req.body.level) course.level = req.body.level;
  if (req.body.assessment) course.assessment = req.body.assessment;
  if (req.body.prerequisites) course.prerequisites = req.body.prerequisites;
  if (req.body.deliveryMode) course.deliveryMode = req.body.deliveryMode;

  res.status(200).json({
    message: "Course updated successfully",
    course,
    courses,
  });
});

// Delete a course by unitCode
course_app.delete("/courses/:unitCode", (req, res) => {
  const courseIndex = courses.findIndex(
    (course) => course.unitCode === req.params.unitCode
  );
  if (courseIndex === -1) {
    return res.status(404).json({
      message: `Course with unit code ${req.params.unitCode} not found`,
    });
  }

  courses.splice(courseIndex, 1);
  res.status(200).json({
    message: "Course deleted successfully",
    courses,
  });
});

export default course_app;
