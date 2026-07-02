import ApiError from "../utils/ApiError.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message);
  }

  logger.error(`${req.method} ${req.originalUrl} -> ${error.statusCode} | ${error.message}`);
  if (env.NODE_ENV === "development" && err.stack) {
    console.error(err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    ...(error.errors.length > 0 && { errors: error.errors }),
    ...(env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};
