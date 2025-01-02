import express from "express";
import bodyParser from "body-parser";
import db from "../../database/connect.js";
import { getResources } from "../../database/dbfunctions.js";
// import courseNotes from "../notes.js";

const notes_app = express.Router();

notes_app.use(bodyParser.urlencoded({ extended: true }));
notes_app.use(bodyParser.json());

// NOTES

// Get all notes for all courses
notes_app.get("/notes", async (req, res) => {
  const courseNotes = await getResources("course_notes");
  res.json({
    courseNotes,
  });
});

// Get all notes for a specific course by subject_id
notes_app.get("/notes/:subject_id", async (req, res) => {
  const courseNotes = await getResources("course_notes");

  // Filter notes that match the subject_id
  const notes = courseNotes.filter(
    (note) => note.subject_id === req.params.subject_id
  );

  if (notes.length > 0) {
    res.status(200).json(notes); // Return all matching notes
  } else {
    res.status(404).json({ message: "No notes found for this subject" }); // Handle case where no notes are found
  }
});

// getting a specific chapter of a note by subject ID and chapter number
notes_app.get("/notes/:subject_id/:chapterNumber", async (req, res) => {
  const courseNotes = await getResources("course_notes");
  const { subject_id, chapterNumber } = req.params;

  // Filter notes that match the subject_id
  const notes = courseNotes.filter((note) => note.subject_id === subject_id);

  if (!(notes.length > 0)) {
    return res.status(404).json({
      message: `Course with unit code ${subject_id} not found`,
    });
  }

  // Convert chapterNumber to a number for comparison
  const chapter = notes.find(
    (chap) => chap.chapter === parseInt(chapterNumber, 10)
  );

  if (!chapter) {
    return res.status(404).json({
      message: `Chapter ${chapterNumber} not found for course with subject id ${subject_id}`,
    });
  }

  res.status(200).json({
    chapter,
  });
});

// Add a new note (chapter) to a specific course by subject_id
notes_app.post("/notes/:subject_id", async (req, res) => {
  const courseNotes = await getResources("course_notes");

  let nextChapterNumber = 1;

  const notes = courseNotes.filter(
    (cn) => cn.subject_id === req.params.subject_id
  );

  if (notes.length > 0) {
    nextChapterNumber = notes.length + 1;
  }
  // Automatically generate the next chapter number based on the length of the notes array

  const course_units = req.params.subject_id;

  const { title, content } = req.body;

  const courses = await getResources("courses");

  const course = courses.find(
    (course) => course.unit_code === req.params.subject_id
  );

  const teachers = await getResources("teachers");
  const teacher = teachers.find((tr) => tr.id === course.teacher_id);

  try {
    const result = await db.query(
      "INSERT INTO course_notes(subject_id, chapter, title, content) VALUES ($1, $2, $3, $4) RETURNING*",
      [course_units, nextChapterNumber, title, content]
    );
    const note = result.rows[0];

    res.status(200).json({
      message: "Note added successfully",
      note,
      course,
      teachers,
      teacher,
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a specific note (chapter) for a course by subject_id and chapter number
notes_app.patch("/notes/:id/:chapterNumber/:subject_id", async (req, res) => {
  const { id, chapterNumber, subject_id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await db.query(
      "UPDATE course_notes SET title = $1, content = $2 WHERE id = $3 RETURNING*",
      [title, content, parseInt(id, 10)]
    );

    const note = result.rows[0];
    const allCourseNotes = await getResources("course_notes");
    // Filter notes that match the subject_id
    const notes = allCourseNotes.filter(
      (note) => note.subject_id === subject_id
    );

    // Convert chapterNumber to a number for comparison
    const chapter = notes.find(
      (chap) => chap.chapter === parseInt(chapterNumber, 10)
    );

    res.status(200).json({
      message: "Note updated successfully",
      note,
      chapter,
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a specific note (chapter) for a course by subject_id and chapter number
notes_app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM course_notes WHERE id = $1 RETURNING*",
      [parseInt(id, 10)]
    );
    const note = result.rows[0];
    const allCourseNotes = await getResources("course_notes");
    // Filter notes that match the subject_id
    const notes = allCourseNotes.filter(
      (note) => note.subject_id === req.params.subject_id
    );
    res.status(200).json({
      message: "Note Deleted successfully",
      note,
      notes,
    });
  } catch (error) {
    console.log(error);
  }
});

export default notes_app;
