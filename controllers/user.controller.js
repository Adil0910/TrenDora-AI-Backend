import ApiResponse from "../utils/ApiResponse.js";
import { updateUserById } from "../repositories/user.repository.js";

export const getProfileHandler = async (req, res, next) => {
  try {
    res.status(200).json(
      new ApiResponse(200, "Profile fetched", {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        githubUsername: req.user.githubUsername,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const updateProfileHandler = async (req, res, next) => {
  try {
    const { name, githubUsername } = req.body;
    const updatedUser = await updateUserById(req.user._id, {
      name,
      githubUsername,
    });

    res.status(200).json(new ApiResponse(200, "Profile updated", updatedUser));
  } catch (error) {
    next(error);
  }
};
