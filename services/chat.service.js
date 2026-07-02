import {
  createChat,
  findChatsByUser,
  findChatById,
  deleteChatById,
  createMessage,
  findMessagesByChat,
} from "../repositories/chat.repository.js";
import { generateAIResponse } from "./ai.service.js";
import ApiError from "../utils/ApiError.js";

export const startNewChat = async (userId, title) => {
  return createChat(userId, title);
};

export const getUserChats = async (userId) => {
  return findChatsByUser(userId);
};

export const getChatMessages = async (chatId) => {
  const chat = await findChatById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  return findMessagesByChat(chatId);
};

export const removeChat = async (chatId) => {
  const chat = await findChatById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }
  return deleteChatById(chatId);
};

export const sendMessage = async (chatId, content) => {
  const chat = await findChatById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  await createMessage(chatId, "user", content);

  const aiReply = await generateAIResponse(content);
  const aiMessage = await createMessage(chatId, "ai", aiReply);

  return aiMessage;
};
