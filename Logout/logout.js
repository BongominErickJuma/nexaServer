import express from "express";
import bodyParser from "body-parser";
import db from "../database/connect.js";

const logout = express.Router();

logout.use(bodyParser.urlencoded({ extended: true }));
logout.use(bodyParser.json());

logout.post("/logout", async (req, res) => {
  const { id, role } = req.body;
  try {
    if (role === "student") {
      await db.query("UPDATE students SET status = $1 WHERE id = $2", [
        "offline",
        id,
      ]);
    }
    if (role !== "student") {
      await db.query("UPDATE teachers SET status = $1 WHERE id = $2", [
        "offline",
        id,
      ]);
    }
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
  }
});

export default logout;
