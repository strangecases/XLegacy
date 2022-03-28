import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    register,
    login,
    logout,
    currentUser,
    // sendTestEmail,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.js";

// middleware
import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));
router.get("/logout", catchAsync(logout));
router.get("/current-user", requireSignin, catchAsync(currentUser));
// router.get("/send-email", sendTestEmail);
router.post("/forgot-password", catchAsync(forgotPassword));
router.post("/reset-password", catchAsync(resetPassword));

export default router;
