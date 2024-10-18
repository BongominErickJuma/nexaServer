import express from "express";
import cors from "cors";
import students_app from "./members/students/students.js";
import teachers_app from "./members/teachers/teachers.js";
import assignments_app from "./calendar/assignments/assignments.js";
import exams_app from "./calendar/exams/exams.js";
import timetable_app from "./classes/timetable/timetable.js";
import course_app from "./resources/courses/courses.js";
import course_assignments_app from "./resources/assignments/assignments.js";
import answers_app from "./resources/answers/answers.js";
import notes_app from "./resources/notes/notes.js";
import meetings_app from "./calendar/meetings/meetings.js";
import events_app from "./classes/Events/events.js";
import login_app from "./Login/login.js";

// configure express
const app = express();
const port = 3000;

// Configure CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// login

app.use(login_app);

// meetings route

app.use(meetings_app);

// events route
app.use(events_app);
// students routes
app.use(students_app);

// teacher's routes
app.use(teachers_app);

// assignments routes
app.use(assignments_app);

// exams routes
app.use(exams_app);

// timetable routes
app.use(timetable_app);

// courses routes
app.use(course_app);

// assignments routes
app.use(course_assignments_app);

// answers routes
app.use(answers_app);

// notes routes
app.use(notes_app);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
