import express from "express";
import { register, login } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";
import { authenticateToken } from "../middleware/authenticate";

const router = express.Router();

router.post("/register", asyncHandler(register));

router.post("/login", login);

export default router;
