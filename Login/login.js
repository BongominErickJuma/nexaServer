import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { getResources } from "../database/dbfunctions.js";

const login_app = express.Router();

login_app.use(bodyParser.urlencoded({ extended: true }));
login_app.use(bodyParser.json());

login_app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const students = await getResources("students");
    const teachers = await getResources("teachers");
    const user =
      students.find(
        (student) => student.name.toLowerCase() === name.toLowerCase()
      ) ||
      teachers.find(
        (teacher) => teacher.name.toLowerCase() === name.toLowerCase()
      );

    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Wrong password",
      });
    }
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

export default login_app;
