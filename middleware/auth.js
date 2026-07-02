import { verifyToken } from "../utils/jwt.js";
import { findUserById } from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Not authorized, no token");
    }

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Not authorized, invalid token"));
  }
};
