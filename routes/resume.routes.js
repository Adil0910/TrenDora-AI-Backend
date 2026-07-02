import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  analyzeResumeHandler,
  getResumesHandler,
  deleteResumeHandler,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.use(protect);

router.post("/analyze", upload.single("resume"), analyzeResumeHandler);
router.get("/", getResumesHandler);
router.delete("/:resumeId", deleteResumeHandler);

export default router;
