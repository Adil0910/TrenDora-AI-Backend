import express from "express";
import { protect } from "../middleware/auth.js";
import { generateCodeHandler, fixBugHandler } from "../controllers/ai.controller.js";

const router = express.Router();

router.use(protect);

router.post("/generate-code", generateCodeHandler);
router.post("/fix-bug", fixBugHandler);

export default router;
