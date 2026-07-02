import User from "../models/User.js";

export const findUserByEmail = async (email, withPassword = false) => {
  if (withPassword) {
    return User.findOne({ email }).select("+password");
  }
  return User.findOne({ email });
};

export const findUserById = async (id) => {
  return User.findById(id);
};

export const createUser = async (userData) => {
  return User.create(userData);
};

export const updateUserById = async (id, updates) => {
  return User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};
