import express from "express";
import bodyParser from "body-parser";
import courseAssignments from "../assignments.js"; // assuming you export your assignments array

const course_assignments_app = express.Router();

course_assignments_app.use(bodyParser.urlencoded({ extended: true }));
course_assignments_app.use(bodyParser.json());

// ASSIGNMENTS

// Get all assignments
course_assignments_app.get("/course_assignments", (req, res) => {
  res.json({
    assignments: courseAssignments,
  });
});

// Get assignments for a specific course
course_assignments_app.get("/course_assignments/:unitCode", (req, res) => {
  const unitCode = req.params.unitCode;
  const courseAssignment = courseAssignments.find(
    (assignment) => assignment.unitCode === unitCode
  );
  if (!courseAssignment) {
    return res.status(404).json({
      message: `Assignments for course ${unitCode} not found`,
    });
  }
  res.status(201).json(courseAssignment);
});

// Add a new assignment for a specific course
course_assignments_app.post("/course_assignments/:unitCode", (req, res) => {
  const unitCode = req.params.unitCode;
  const courseAssignment = courseAssignments.find(
    (assignment) => assignment.unitCode === unitCode
  );

  if (!courseAssignment) {
    return res.status(404).json({
      message: `Course ${unitCode} not found for assignments`,
    });
  }

  const newAssignment = {
    id: courseAssignment.assignments.length + 1, // Auto-increment ID
    question: req.body.question,
  };

  courseAssignment.assignments.push(newAssignment);
  res.status(200).json({
    message: "Assignment added successfully",
    courseAssignment,
  });
});

course_assignments_app.patch(
  "/course_assignments/:unitCode/:id",
  (req, res) => {
    const unitCode = req.params.unitCode;
    const assignmentId = parseInt(req.params.id, 10);
    const courseAssignment = courseAssignments.find(
      (assignment) => assignment.unitCode === unitCode
    );

    const assignment = courseAssignment.assignments.find(
      (a) => a.id === assignmentId
    );

    if (!assignment) {
      return res.status(404).json({
        message: `Assignment with id ${assignmentId} not found for course ${unitCode}`,
      });
    }

    if (req.body.question) {
      assignment.question = req.body.question;
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      courseAssignment,
    });
  }
);

// Delete an assignment
course_assignments_app.delete(
  "/course_assignments/:unitCode/:id",
  (req, res) => {
    const unitCode = req.params.unitCode;
    const assignmentId = parseInt(req.params.id, 10);
    const courseAssignment = courseAssignments.find(
      (assignment) => assignment.unitCode === unitCode
    );

    const assignmentIndex = courseAssignment.assignments.findIndex(
      (a) => a.id === assignmentId
    );

    if (assignmentIndex === -1) {
      return res.status(404).json({
        message: `Assignment with id ${assignmentId} not found for course ${unitCode}`,
      });
    }

    courseAssignment.assignments.splice(assignmentIndex, 1);

    res.status(200).json({
      message: "Assignment deleted successfully",
      courseAssignment,
    });
  }
);

export default course_assignments_app;
