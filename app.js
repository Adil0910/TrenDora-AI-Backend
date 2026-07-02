import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import githubRoutes from "./routes/github.routes.js";
import userRoutes from "./routes/user.routes.js";
import { requestLogger } from "./middleware/logger.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://tren-dora.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman ya same-origin requests ke liye
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/user", userRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use(errorHandler);

export default app;