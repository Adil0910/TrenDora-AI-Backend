import { verifyToken } from "../utils/jwt.js";
import { sendMessage } from "../services/chat.service.js";
import { logger } from "../utils/logger.js";

const authenticateSocket = (socket, next) => {
  try {
    const handshakeToken = socket.handshake.auth?.token;

    const cookieToken = socket.handshake.headers.cookie
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    const token = handshakeToken || cookieToken;

    if (!token) return next(new Error("Not authorized"));

    const decoded = verifyToken(token);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error("Not authorized"));
  }
};

export const initChatSocket = (io) => {
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
      logger.info(`Socket ${socket.id} joined chat=${chatId}`);
    });

    socket.on("send-message", async ({ chatId, content }) => {
      logger.info(`send-message received | chat=${chatId} | content="${content}"`);
      try {
        const aiMessage = await sendMessage(chatId, content);
        logger.info(`AI reply generated for chat=${chatId}`);
        io.to(chatId).emit("receive-message", aiMessage);
      } catch (error) {
        logger.error(`send-message failed | chat=${chatId} | ${error.message}`);
        socket.emit("chat-error", { message: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
