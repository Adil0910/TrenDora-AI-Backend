import { signToken } from "./jwt.js";
import { env } from "../config/env.js";

export const generateToken = (res, userId) => {
  const token = signToken({ id: userId });

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
