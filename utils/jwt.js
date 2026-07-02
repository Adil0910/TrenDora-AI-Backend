import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
