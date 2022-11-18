import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    principleRegister,
    principleLogin,
    principleLogout,
    iscurrentPrinciple,
} from "../controllers/principle.js";

import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

// only admin can create this account of a principle may be use 'isAdmin' middleware
router.post("/register", catchAsync(principleRegister));

router.post("/login", catchAsync(principleLogin));
router.get("/logout", catchAsync(principleLogout));

// check if 'signedin' and the user is a principle
router.get("/current-principle", requireSignin, catchAsync(iscurrentPrinciple));

export default router;
