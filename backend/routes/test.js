import express from "express";
import {
    index,
    createTest,
    getOneTest,
    editTest,
    deleteTest,
} from "../controllers/test.js";
import { isAuthor, requireSignin } from "../middlewares/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/")
    .get(requireSignin, catchAsync(index))
    .post(catchAsync(createTest));

router
    .route("/:id")
    .get(catchAsync(getOneTest))
    .patch(requireSignin, catchAsync(isAuthor), catchAsync(editTest))
    .delete(requireSignin, catchAsync(isAuthor), catchAsync(deleteTest));

export default router;
