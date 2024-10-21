import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../database/dbfunctions.js";

const overall_stats_app = express.Router();

overall_stats_app.use(bodyParser.urlencoded({ extended: true }));
overall_stats_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)
overall_stats_app.get("/overall_stats", async (req, res) => {
  const courses = await getResources("courses");
  const students = await getResources("students");
  const teachers = await getResources("teachers");

  const active_students = students.filter(
    (student) => student.status === "online"
  );
  const active_teachers = teachers.filter(
    (teacher) => teacher.status === "online"
  );

  res.json({
    courses: courses.length,
    users: students.length + teachers.length,
    active_users: active_students.length + active_teachers.length,
  });
});

export default overall_stats_app;
