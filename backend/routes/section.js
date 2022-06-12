import express from "express";
import {
    index,
    createSection,
    showSection,
    editSection,
    deleteSection,
} from "../controllers/section.js";
import { arrayLimitForSection } from "../middlewares/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/:testId/sections")
    .get(catchAsync(index))
    .post(catchAsync(arrayLimitForSection), catchAsync(createSection));

router
    .route("/:testId/sections/:sectionId")
    .get(catchAsync(showSection))
    .patch(catchAsync(editSection))
    .delete(catchAsync(deleteSection));

export default router;
