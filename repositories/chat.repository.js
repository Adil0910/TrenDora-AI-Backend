import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const createChat = async (userId, title) => {
  return Chat.create({ user: userId, title });
};

export const findChatsByUser = async (userId) => {
  return Chat.find({ user: userId }).sort({ updatedAt: -1 });
};

export const findChatById = async (chatId) => {
  return Chat.findById(chatId);
};

export const deleteChatById = async (chatId) => {
  await Message.deleteMany({ chat: chatId });
  return Chat.findByIdAndDelete(chatId);
};

export const createMessage = async (chatId, role, content) => {
  return Message.create({ chat: chatId, role, content });
};

export const findMessagesByChat = async (chatId) => {
  return Message.find({ chat: chatId }).sort({ createdAt: 1 });
};
