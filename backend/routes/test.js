import express from "express";
import {
    index,
    createTest,
    getOneTest,
    editTest,
    deleteTest,
} from "../controllers/test.js";
import { isTestAuthor, requireSignin } from "../middlewares/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/:id/tests")
    .get(requireSignin, catchAsync(index))
    .post(catchAsync(createTest));

router
    .route("/:id/tests/:testId")
    .get(catchAsync(getOneTest))
    .patch(requireSignin, catchAsync(isTestAuthor), catchAsync(editTest))
    .delete(requireSignin, catchAsync(isTestAuthor), catchAsync(deleteTest));

export default router;
