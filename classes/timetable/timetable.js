import express from "express";
import bodyParser from "body-parser";
import { subjects, schedules } from "../timetable.js"; // Assuming subjects and schedules are defined

const timetable_app = express.Router();

timetable_app.use(bodyParser.urlencoded({ extended: true }));
timetable_app.use(bodyParser.json());

// TIMETABLE

// get all timetables (combining subjects and schedules)
timetable_app.get("/timetables", (req, res) => {
  const timetables = subjects.map((subject) => {
    const subjectSchedule = schedules.filter(
      (schedule) => schedule.subject_id === subject.id
    );
    return {
      ...subject,
      schedule: subjectSchedule,
    };
  });

  res.json({
    timetables: timetables,
  });
});

// get specific timetable by subject id
timetable_app.get("/timetables/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = subjects.find((subject) => subject.id === id);
  if (!subject) {
    return res.status(404).json({
      message: `Subject with id ${id} not found`,
    });
  }

  const subjectSchedule = schedules.filter(
    (schedule) => schedule.subject_id === id
  );
  res.status(200).json({
    ...subject,
    schedule: subjectSchedule,
  });
});

// add a new timetable (subject and schedule)
timetable_app.post("/timetables", (req, res) => {
  const newSubject = {
    id: subjects.length + 1,
    name: req.body.name,
  };

  subjects.push(newSubject);

  const newSchedule = req.body.schedule.map((scheduleEntry) => ({
    id: schedules.length + 1, // Assuming unique id for schedules
    subject_id: newSubject.id,
    ...scheduleEntry,
  }));

  schedules.push(...newSchedule);

  res.status(200).json({
    message: "Subject and schedule added successfully",
    subject: newSubject,
    schedule: newSchedule,
  });
});

// update a timetable (subject name and schedule)
timetable_app.patch("/timetables/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = subjects.find((subject) => subject.id === id);

  if (!subject) {
    return res.status(404).json({
      message: `Subject with id ${id} not found`,
    });
  }

  // Update subject name if provided
  if (req.body.name) subject.name = req.body.name;

  // Update schedule if provided
  if (req.body.schedule) {
    req.body.schedule.forEach((update) => {
      const scheduleToUpdate = schedules.find(
        (entry) => entry.subject_id === id && entry.day === update.day
      );

      // If a matching schedule entry is found, update it
      if (scheduleToUpdate) {
        if (update.start_time) scheduleToUpdate.start_time = update.start_time;
        if (update.duration) scheduleToUpdate.duration = update.duration;
        if (update.room) scheduleToUpdate.room = update.room;
      } else {
        // If no matching schedule entry, add a new one
        schedules.push({
          id: schedules.length + 1,
          subject_id: id,
          day: update.day,
          start_time: update.start_time,
          duration: update.duration,
          room: update.room,
        });
      }
    });
  }

  res.status(200).json({
    message: "Timetable updated successfully",
    subject,
    schedule: schedules.filter((schedule) => schedule.subject_id === id),
  });
});

// delete a timetable (subject and its schedules)
timetable_app.delete("/timetables/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subjectIndex = subjects.findIndex((subject) => subject.id === id);

  if (subjectIndex === -1) {
    return res.status(404).json({
      message: `Subject with id ${id} not found`,
    });
  }

  // Remove the subject
  subjects.splice(subjectIndex, 1);

  // Remove all schedules associated with the subject
  const schedulesToRemove = schedules.filter(
    (schedule) => schedule.subject_id === id
  );
  schedulesToRemove.forEach((schedule) => {
    const index = schedules.indexOf(schedule);
    if (index > -1) {
      schedules.splice(index, 1);
    }
  });

  res.status(200).json({
    message: "Timetable deleted successfully",
    subjects,
    schedules,
  });
});

export default timetable_app;
