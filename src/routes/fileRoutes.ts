import express from "express";
import {
  uploadFile,
  getFiles,
  organizeFiles,
  accessSharedFile,
  generateShareableLink,
  getFileStatistics,
} from "../controllers/fileController";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile); // Upload file with tags
router.get("/", getFiles); // Get all uploaded files
router.post("/organize", organizeFiles); // Organize files
router.get("/stats/:fileId", getFileStatistics); // Get file statistics

export default router;
