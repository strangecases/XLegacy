import express from "express";
import {
    index,
    createSchool,
    editSchool,
    showSchool,
    searchSchool,
    deleteSchool,
} from "../controllers/school.js";
import { requireSignin } from "../middlewares/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/")
    .get(requireSignin, catchAsync(index))
    .post(catchAsync(createSchool));

router.route("/search").get(catchAsync(searchSchool));

router
    .route("/:id")
    .get(catchAsync(showSchool))
    .patch(catchAsync(editSchool))
    .delete(catchAsync(deleteSchool));

export default router;
