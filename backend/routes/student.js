import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    studentRegister,
    studentLogout,
    studentLogin,
    iscurrentStudent,
} from "../controllers/student.js";

import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

// only teacher can create this account of a student, may be use 'isTeacher' middleware
router.post("/register", catchAsync(studentRegister));

router.post("/login", catchAsync(studentLogin));
router.get("/logout", catchAsync(studentLogout));

// check if 'signedin' and the user is a student
router.get("/current-student", requireSignin, catchAsync(iscurrentStudent));

export default router;
