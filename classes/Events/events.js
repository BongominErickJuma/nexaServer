import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";

const events_app = express.Router();

events_app.use(bodyParser.urlencoded({ extended: true }));
events_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)
events_app.get("/events", async (req, res) => {
  const courses = await getResources("courses");
  const schedules = await getResources("semester_timetable");
  const assignments = await getResources("assignment_timetable");
  const exams = await getResources("exams");
  const meetings = await getResources("meetings");

  const events = [...schedules, ...exams, ...meetings];
  res.json({
    events,
    courses,
    assignments,
  });
});

export default events_app;
