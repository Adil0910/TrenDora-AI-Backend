import express from "express";
import { protect } from "../middleware/auth.js";
import { getProfileHandler, updateProfileHandler } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getProfileHandler);
router.put("/profile", updateProfileHandler);

export default router;
