import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({ name, email, password });
    const token = generateToken(res, user._id);

    res
      .status(201)
      .json(
        new ApiResponse(201, "User registered successfully", {
          id: user._id,
          name: user.name,
          email: user.email,
          token, // sent in body too, since cross-domain deployments (Vercel + Render) often block the cookie as third-party
        })
      );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser({ email, password });
    const token = generateToken(res, user._id);

    res.status(200).json(
      new ApiResponse(200, "Login successful", {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(200, "Logout successful"));
  } catch (error) {
    next(error);
  }
};
