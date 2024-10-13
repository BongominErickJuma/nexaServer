import express from "express";
import bodyParser from "body-parser";
import courseNotes from "../notes.js"; // Assuming you store the notes data in a file called notes.js

const notes_app = express.Router();

notes_app.use(bodyParser.urlencoded({ extended: true }));
notes_app.use(bodyParser.json());

// NOTES

// Get all notes for all courses
notes_app.get("/notes", (req, res) => {
  res.json({
    courseNotes,
  });
});

// Get all notes for a specific course by subject_id
notes_app.get("/notes/:subject_id", (req, res) => {
  const course = courseNotes.find(
    (course) => course.subject_id === req.params.subject_id
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with subject id ${req.params.subject_id} not found`,
    });
  }
  res.status(200).json(course.notes);
});

// getting a specific chapter of a note by subject ID and chapter number
notes_app.get("/notes/:subject_id/:chapterNumber", (req, res) => {
  const { subject_id, chapterNumber } = req.params;

  // Find the course notes by subject_id
  const course = courseNotes.find((course) => course.subject_id === subject_id);

  if (!course) {
    return res.status(404).json({
      message: `Course with subject id ${subject_id} not found`,
    });
  }

  // Find the specific chapter by chapter number (convert to string for comparison)
  const chapter = course.notes.find((chap) => chap.chapter === chapterNumber);

  if (!chapter) {
    return res.status(404).json({
      message: `Chapter ${chapterNumber} not found for course with subject id ${subject_id}`,
    });
  }

  res.status(200).json(chapter);
});

// Add a new note (chapter) to a specific course by subject_id
notes_app.post("/notes/:subject_id", (req, res) => {
  const course = courseNotes.find(
    (course) => course.subject_id === req.params.subject_id
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with subject id ${req.params.subject_id} not found`,
    });
  }

  // Automatically generate the next chapter number based on the length of the notes array
  const nextChapterNumber = `${course.notes.length + 1}`;

  const newNote = {
    chapter: nextChapterNumber,
    title: req.body.title,
    content: req.body.content,
    attachments: req.body.attachments || [],
  };

  course.notes.push(newNote);

  res.status(200).json({
    message: "Note added successfully",
    course,
  });
});

// Update a specific note (chapter) for a course by subject_id and chapter number
notes_app.patch("/notes/:subject_id/:chapter", (req, res) => {
  const course = courseNotes.find(
    (course) => course.subject_id === req.params.subject_id
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with subject id ${req.params.subject_id} not found`,
    });
  }

  const note = course.notes.find((note) => note.chapter === req.params.chapter);
  if (!note) {
    return res.status(404).json({
      message: `Chapter ${req.params.chapter} not found for course with subject id ${req.params.subject_id}`,
    });
  }

  if (req.body.title) note.title = req.body.title;
  if (req.body.content) note.content = req.body.content;
  if (req.body.attachments) note.attachments = req.body.attachments;

  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
});

// Delete a specific note (chapter) for a course by subject_id and chapter number
notes_app.delete("/notes/:subject_id/:chapter", (req, res) => {
  const course = courseNotes.find(
    (course) => course.subject_id === req.params.subject_id
  );
  if (!course) {
    return res.status(404).json({
      message: `Course with subject id ${req.params.subject_id} not found`,
    });
  }

  const noteIndex = course.notes.findIndex(
    (note) => note.chapter === req.params.chapter
  );
  if (noteIndex === -1) {
    return res.status(404).json({
      message: `Chapter ${req.params.chapter} not found for course with subject id ${req.params.subject_id}`,
    });
  }

  course.notes.splice(noteIndex, 1);
  res.status(200).json({
    message: "Note deleted successfully",
    course,
  });
});

export default notes_app;
