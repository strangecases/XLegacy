import express from "express";
import {
    index,
    createTest,
    showSection,
    editSection,
} from "../controllers/section.js";
import { arrayLimitForSection } from "../middlewares/index.js";
import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router
    .route("/tests/:id/sections")
    .get(catchAsync(index))
    .post(catchAsync(arrayLimitForSection), catchAsync(createTest));

router
    .route("/tests/:id/sections/:sectionId")
    .get(catchAsync(showSection))
    .patch(catchAsync(editSection));

export default router;
