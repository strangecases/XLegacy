import express from "express";
import { index, createTest } from "../controllers/section.js";

const router = express.Router();

router.route("/section").get(index).post(createTest);

export default router;
