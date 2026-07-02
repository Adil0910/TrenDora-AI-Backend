import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

const SALT_ROUNDS = 10;

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({ name, email, password: hashedPassword });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email, true);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};
