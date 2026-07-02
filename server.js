import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { initChatSocket } from "./sockets/chat.socket.js";

const httpServer = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://tren-dora.vercel.app",
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

initChatSocket(io);

const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(env.PORT, () => {
      console.log(
        `Server running on port ${env.PORT} [${env.NODE_ENV}]`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();