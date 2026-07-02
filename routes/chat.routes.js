import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createChatHandler,
  getChatsHandler,
  getMessagesHandler,
  deleteChatHandler,
  sendMessageHandler,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createChatHandler);
router.get("/", getChatsHandler);
router.get("/:chatId/messages", getMessagesHandler);
router.post("/:chatId/messages", sendMessageHandler);
router.delete("/:chatId", deleteChatHandler);

export default router;
