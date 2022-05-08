import express from "express";
import { index, createExam, showExam, editExam } from "../controllers/exam.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.route("/").get(catchAsync(index)).post(catchAsync(createExam));

router.route("/:examId").get(catchAsync(showExam)).patch(catchAsync(editExam));

export default router;
