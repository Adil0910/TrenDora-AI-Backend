import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getGithubProfileHandler,
  getGithubReposHandler,
} from "../controllers/github.controller.js";

const router = express.Router();

router.use(protect);

router.get("/:username", getGithubProfileHandler);
router.get("/:username/repos", getGithubReposHandler);

export default router;
