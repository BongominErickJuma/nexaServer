import express from "express";
import bodyParser from "body-parser";
import assignments from "../assignments.js";

const assignments_app = express.Router();

assignments_app.use(bodyParser.urlencoded({ extended: true }));
assignments_app.use(bodyParser.json());

// assignments

// get all assignments
assignments_app.get("/assignments", (req, res) => {
  res.json({
    assignments: assignments,
  });
});

// get specific assignment
assignments_app.get("/assignments/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignment = assignments.find((assignment) => assignment.id === id);
  if (!assignment) {
    return res.status(404).json({
      message: `assignment with id ${id} not found`,
    });
  } else {
    res.status(201).json(assignment);
  }
});

// add a new assignment
assignments_app.post("/assignments", (req, res) => {
  const assignment = {
    id: assignments.length + 1,
    name: req.body.name,
    duedate: req.body.duedate,
    location: req.body.location,
    description: req.body.description,
  };
  assignments.push(assignment);
  res.status(200).json({
    message: "assignment added successfully",
    assignment,
    assignments,
  });
});

// update a assignment

assignments_app.patch("/assignments/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignment = assignments.find((assignment) => assignment.id === id);
  if (!assignment) {
    return res.status(404).json({
      message: `assignment with id ${id} not found`,
    });
  }

  if (req.body.name) assignment.name = req.body.name;
  if (req.body.duedate) assignment.duedate = req.body.duedate;
  if (req.body.location) assignment.location = req.body.location;
  if (req.body.description) assignment.description = req.body.description;

  res.status(200).json({
    message: "assignment Updated successfully",
    assignment,
    assignments,
  });
});

// delete assignment

assignments_app.delete("/assignments/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignmentIndex = assignments.findIndex(
    (assignment) => assignment.id === id
  );
  if (assignmentIndex === -1) {
    return res.status(404).json({
      message: `assignment with id ${id} not found`,
    });
  }

  assignments.splice(assignmentIndex, 1);

  res.status(200).json({
    message: "assignment Deleted successfully",
    assignments,
  });
});

export default assignments_app;
