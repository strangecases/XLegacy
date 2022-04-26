import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    register,
    login,
    logout,
    currentAdmin,
    // sendTestEmail,
    forgotPassword,
    resetPassword,
    adminIsAuthor,
} from "../controllers/auth.js";

// middleware
import { requireSignin, isAuthor } from "../middlewares/index.js";

const router = express.Router();

router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));
router.get("/logout", catchAsync(logout));
router.get("/current-admin", requireSignin, catchAsync(currentAdmin));
router.get(
    "/admin-is-author/:id",
    requireSignin,
    catchAsync(isAuthor),
    catchAsync(adminIsAuthor)
);
router.post("/forgot-password", catchAsync(forgotPassword));
router.post("/reset-password", catchAsync(resetPassword));

export default router;
