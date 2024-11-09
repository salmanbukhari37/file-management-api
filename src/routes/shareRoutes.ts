import express from "express";
import {
  generateShareableLink,
  accessSharedFile,
} from "../controllers/shareController";
import { authenticateToken } from "../middleware/authenticate";

const router = express.Router();

router.post("/generate-link/:fileId", authenticateToken, generateShareableLink);
router.get("/:token", accessSharedFile);

export default router;
