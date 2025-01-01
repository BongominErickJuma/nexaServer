import express from "express";
import bodyParser from "body-parser";
// import { subjects, schedules } from "../timetable.js";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";

const timetable_app = express.Router();

timetable_app.use(bodyParser.urlencoded({ extended: true }));
timetable_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)
timetable_app.get("/timetables", async (req, res) => {
  const courses = await getResources("courses");
  const schedules = await getResources("semester_timetable");

  res.json({
    courses,
    schedules,
  });
});

// add a new timetable (subject and schedule)
timetable_app.post("/timetables", async (req, res) => {
  const { unit_code, day, start_time, duration, room } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO semester_timetable (unit_code, day, start_time, duration, room) VALUES($1, $2, $3, $4, $5) RETURNING*`,
      [unit_code, day, start_time, duration, room]
    );
    const schedule = result.rows[0];

    const courses = await getResources("courses");
    const schedules = await getResources("semester_timetable");

    res.status(200).json({
      message: "Schedule added successfully",
      schedule,
      courses,
      schedules,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a timetable (subject name and schedule)
timetable_app.patch("/timetables/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { day, start_time, duration, room } = req.body;

  try {
    const result = await db.query(
      `UPDATE semester_timetable SET day = $1, start_time = $2, duration = $3, room = $4 WHERE id = $5 RETURNING*`,
      [day, start_time, duration, room, id]
    );
    const schedule = result.rows[0];

    const courses = await getResources("courses");
    const schedules = await getResources("semester_timetable");
    res.status(200).json({
      message: "Schedule Updated successfully",
      schedule,
      courses,
      schedules,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete a timetable (subject and its schedules)
timetable_app.delete("/timetables/:id", async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM semester_timetable WHERE id = $1 RETURNING*`,
      [parseInt(req.params.id, 10)]
    );
    const schedule = result.rows[0];
    const courses = await getResources("courses");
    const schedules = await getResources("semester_timetable");
    res.status(200).json({
      message: "Schedule deleted successfully",
      schedule,
      courses,
      schedules,
    });
  } catch (error) {
    console.log(error);
  }
});

export default timetable_app;
