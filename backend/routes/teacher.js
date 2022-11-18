import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    teacherRegister,
    teacherLogin,
    teacherLogout,
    iscurrentTeacher,
} from "../controllers/teacher.js";

import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

// only principle can create this account of a teacher, may be use 'isPrinciple' middleware
router.post("/register", catchAsync(teacherRegister));

router.post("/login", catchAsync(teacherLogin));
router.get("/logout", catchAsync(teacherLogout));

// check if 'signedin' and the user is a teacher
router.get("/current-teacher", requireSignin, catchAsync(iscurrentTeacher));

export default router;
