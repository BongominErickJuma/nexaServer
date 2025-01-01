import express from "express";
import bodyParser from "body-parser";
import { getResources } from "../../database/dbfunctions.js";
import db from "../../database/connect.js";

const meetings_app = express.Router();

meetings_app.use(bodyParser.urlencoded({ extended: true }));
meetings_app.use(bodyParser.json());

// meetings

// get all meetings
meetings_app.get("/meetings", async (req, res) => {
  const meetings = await getResources("meetings");
  res.json({
    meetings,
  });
});

// get specific exam
meetings_app.get("/meetings/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const meetings = await getResources("meetings");
  const exam = meetings.find((exam) => exam.id === id);
  if (!exam) {
    return res.status(404).json({
      message: `exam with id ${id} not found`,
    });
  } else {
    res.status(201).json(exam);
  }
});

// add a new exam
meetings_app.post("/meetings", async (req, res) => {
  const { title, date, start_time, duration, location, description } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO meetings (title, date, start_time, duration, location, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING*`,
      [title, date, start_time, duration, location, description]
    );
    const Addedmeetings = result.rows[0];
    const meetings = await getResources("meetings");
    res.status(200).json({
      message: "meeting added successfully",
      meetings,
      Addedmeetings,
    });
  } catch (error) {
    console.log(error);
  }
});

// update a exam

meetings_app.patch("/meetings/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, date, start_time, duration, location, description } = req.body;
  try {
    const result = await db.query(
      `UPDATE meetings SET title = $1, date = $2, start_time = $3, duration = $4, location = $5, description = $6 WHERE id = $7 RETURNING*`,
      [title, date, start_time, duration, location, description, id]
    );
    const Addedmeetings = result.rows[0];
    const meetings = await getResources("meetings");
    res.status(200).json({
      message: "meeting Updated successfully",
      meetings,
      Addedmeetings,
    });
  } catch (error) {
    console.log(error);
  }
});

// delete exam

meetings_app.delete("/meetings/:id", async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM meetings WHERE id = $1 RETURNING*`,
      [parseInt(req.params.id, 10)]
    );
    const Addedmeetings = result.rows[0];
    const meetings = await getResources("meetings");
    res.status(200).json({
      message: "meetings deleted successfully",
      meetings,
      Addedmeetings,
    });
  } catch (error) {
    console.log(error);
  }
});

export default meetings_app;
