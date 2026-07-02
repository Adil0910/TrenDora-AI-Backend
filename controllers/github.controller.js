import { fetchGithubProfile, fetchGithubRepos } from "../services/github.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getGithubProfileHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const profile = await fetchGithubProfile(username);
    res.status(200).json(new ApiResponse(200, "GitHub profile fetched", profile));
  } catch (error) {
    next(error);
  }
};

export const getGithubReposHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const repos = await fetchGithubRepos(username);
    res.status(200).json(new ApiResponse(200, "GitHub repos fetched", repos));
  } catch (error) {
    next(error);
  }
};
