import express from "express";
import bodyParser from "body-parser";
import db from "../database/connect.js";

const images_app = express.Router();

images_app.use(bodyParser.urlencoded({ extended: true }));
images_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)

images_app.patch("/images/:id", async (req, res) => {
  const { image, role } = req.body;
  const id = parseInt(req.params.id, 10);

  try {
    let result = "";

    if (role === "student") {
      result = await db.query(
        "UPDATE students SET image = $1 WHERE id = $2 RETURNING*",
        [image, id]
      );
    }

    if (role !== "student") {
      result = await db.query(
        "UPDATE teachers SET image = $1 WHERE id = $2 RETURNING*",
        [image, id]
      );
    }

    const update = result.rows[0];
    res.status(200).json({
      message: "Image Updated successfully",
      update,
    });
  } catch (error) {
    console.log(error);
  }
});

export default images_app;
