import express from "express";
import { index, createTest } from "../controllers/test.js";

const router = express.Router();

router.route("/test").get(index).post(createTest);

export default router;
