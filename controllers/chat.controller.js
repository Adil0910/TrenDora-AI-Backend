import ApiResponse from "../utils/ApiResponse.js";
import {
  startNewChat,
  getUserChats,
  getChatMessages,
  removeChat,
  sendMessage,
} from "../services/chat.service.js";

export const createChatHandler = async (req, res, next) => {
  try {
    const { title } = req.body;
    const chat = await startNewChat(req.user._id, title);
    res.status(201).json(new ApiResponse(201, "Chat created", chat));
  } catch (error) {
    next(error);
  }
};

export const getChatsHandler = async (req, res, next) => {
  try {
    const chats = await getUserChats(req.user._id);
    res.status(200).json(new ApiResponse(200, "Chats fetched", chats));
  } catch (error) {
    next(error);
  }
};

export const getMessagesHandler = async (req, res, next) => {
  try {
    const messages = await getChatMessages(req.params.chatId);
    res.status(200).json(new ApiResponse(200, "Messages fetched", messages));
  } catch (error) {
    next(error);
  }
};

export const deleteChatHandler = async (req, res, next) => {
  try {
    await removeChat(req.params.chatId);
    res.status(200).json(new ApiResponse(200, "Chat deleted"));
  } catch (error) {
    next(error);
  }
};

export const sendMessageHandler = async (req, res, next) => {
  try {
    const { content } = req.body;
    const aiMessage = await sendMessage(req.params.chatId, content);
    res.status(200).json(new ApiResponse(200, "Message sent", aiMessage));
  } catch (error) {
    next(error);
  }
};
