import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { getResources } from "../database/dbfunctions.js";
import db from "../database/connect.js";

const password_app = express.Router();
const saltRounds = 10;

password_app.use(bodyParser.urlencoded({ extended: true }));
password_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)

password_app.patch("/passwords/:id", async (req, res) => {
  const { password, changedPassword, name, role } = req.body;
  const id = parseInt(req.params.id, 10);
z
  try {
    const students = await getResources("students");
    const teachers = await getResources("teachers");
    const user =
      role === "student"
        ? students.find(
            (student) => student.name.toLowerCase() === name.toLowerCase()
          )
        : teachers.find(
            (teacher) => teacher.name.toLowerCase() === name.toLowerCase()
          );

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Wrong Current password",
      });
    }

    const hashedPassword = await bcrypt.hash(changedPassword, saltRounds);
    if (user.role === "student") {
      await db.query("UPDATE students SET password = $1 WHERE id = $2", [
        hashedPassword,
        id,
      ]);
    }
    if (user.role !== "student") {
      await db.query("UPDATE teachers SET password = $1 WHERE id = $2", [
        hashedPassword,
        id,
      ]);
    }
    res.status(200).json({
      message: "Password Updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

export default password_app;
