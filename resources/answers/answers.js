import express from "express";
import bodyParser from "body-parser";
import courseAssignmentAnswers from "../answers.js"; // assuming you export your answers array

const answers_app = express.Router();

answers_app.use(bodyParser.urlencoded({ extended: true }));
answers_app.use(bodyParser.json());

// Get all answers
answers_app.get("/answers", (req, res) => {
  res.json({
    answers: courseAssignmentAnswers,
  });
});

// Get answers for a specific course
answers_app.get("/answers/:unitCode", (req, res) => {
  const unitCode = req.params.unitCode;
  const courseAnswer = courseAssignmentAnswers.find(
    (course) => course.unitCode === unitCode
  );
  if (!courseAnswer) {
    return res.status(404).json({
      message: `Answers for course ${unitCode} not found`,
    });
  }
  res.status(200).json(courseAnswer);
});

// Add a new answer for a specific course question
answers_app.post("/answers/:unitCode/:questionId", (req, res) => {
  const { unitCode, questionId } = req.params;
  const courseAnswer = courseAssignmentAnswers.find(
    (course) => course.unitCode === unitCode
  );

  if (!courseAnswer) {
    return res.status(404).json({
      message: `Course ${unitCode} not found`,
    });
  }

  const question = courseAnswer.answers.find(
    (q) => q.id === parseInt(questionId)
  );

  if (!question) {
    return res.status(404).json({
      message: `Question ID ${questionId} not found for course ${unitCode}`,
    });
  }

  const newAnswer = {
    id: question.answers.length + 1,
    answer: req.body.answer,
  };

  question.answers.push(newAnswer);

  res.status(200).json({
    message: "New answer added successfully",
    courseAnswer,
  });
});

// Update a specific answer for a specific course question
answers_app.patch("/answers/:unitCode/:questionId/:answerId", (req, res) => {
  const { unitCode, questionId, answerId } = req.params;
  const courseAnswer = courseAssignmentAnswers.find(
    (course) => course.unitCode === unitCode
  );

  if (!courseAnswer) {
    return res.status(404).json({
      message: `Course ${unitCode} not found`,
    });
  }

  const question = courseAnswer.answers.find(
    (q) => q.id === parseInt(questionId)
  );

  if (!question) {
    return res.status(404).json({
      message: `Question ID ${questionId} not found for course ${unitCode}`,
    });
  }

  const answer = question.answers.find((a) => a.id === parseInt(answerId));

  if (!answer) {
    return res.status(404).json({
      message: `Answer ID ${answerId} not found for question ${questionId}`,
    });
  }

  if (req.body.answer) {
    answer.answer = req.body.answer;
  }

  res.status(200).json({
    message: "Answer updated successfully",
    courseAnswer,
  });
});

// Delete a specific answer for a specific course question
answers_app.delete("/answers/:unitCode/:questionId/:answerId", (req, res) => {
  const { unitCode, questionId, answerId } = req.params;
  const courseAnswer = courseAssignmentAnswers.find(
    (course) => course.unitCode === unitCode
  );

  if (!courseAnswer) {
    return res.status(404).json({
      message: `Course ${unitCode} not found`,
    });
  }

  const question = courseAnswer.answers.find(
    (q) => q.id === parseInt(questionId)
  );

  if (!question) {
    return res.status(404).json({
      message: `Question ID ${questionId} not found for course ${unitCode}`,
    });
  }

  const answerIndex = question.answers.findIndex(
    (a) => a.id === parseInt(answerId)
  );

  if (answerIndex === -1) {
    return res.status(404).json({
      message: `Answer ID ${answerId} not found for question ${questionId}`,
    });
  }

  question.answers.splice(answerIndex, 1);

  res.status(200).json({
    message: "Answer deleted successfully",
    courseAnswer,
  });
});

export default answers_app;
