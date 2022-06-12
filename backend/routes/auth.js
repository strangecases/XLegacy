import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    register,
    login,
    logout,
    currentAdmin,
    // sendTestEmail,
    forgotPassword,
    editAdmin,
    resetPassword,
    adminIsAuthor,
} from "../controllers/auth.js";

// middleware
import {
    requireSignin,
    isTestAuthor,
    isSchoolAdmin,
} from "../middlewares/index.js";

const router = express.Router();

router.post("/register", catchAsync(register));
router.patch("/register/:registerId", catchAsync(editAdmin));
router.post("/login", catchAsync(login));
router.get("/logout", catchAsync(logout));
router.get("/current-admin", requireSignin, catchAsync(currentAdmin));
router.get(
    "/admin-is-author/:testId",
    requireSignin,
    catchAsync(isTestAuthor),
    catchAsync(adminIsAuthor)
);
router.get(
    "/admin-is-school-admin/:id",
    requireSignin,
    catchAsync(isSchoolAdmin),
    catchAsync(adminIsAuthor)
);
router.post("/forgot-password", catchAsync(forgotPassword));
router.post("/reset-password", catchAsync(resetPassword));

export default router;
