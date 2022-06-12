import express from "express";
import { index, createExam, showExam, editExam } from "../controllers/exam.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/:id/tests/:testId/exams")
    .get(catchAsync(index))
    .post(catchAsync(createExam));

router
    .route("/:id/tests/:testId/exams/:examId")
    .get(catchAsync(showExam))
    .patch(catchAsync(editExam));

export default router;
