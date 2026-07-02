import axios from "axios";
import ApiError from "../utils/ApiError.js";

const GITHUB_API = "https://api.github.com";

export const fetchGithubProfile = async (username) => {
  try {
    const { data } = await axios.get(`${GITHUB_API}/users/${username}`);
    return {
      username: data.login,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      profileUrl: data.html_url,
    };
  } catch (error) {
    throw new ApiError(404, "GitHub user not found");
  }
};

export const fetchGithubRepos = async (username) => {
  try {
    const { data } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=10`
    );
    return data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    throw new ApiError(404, "Could not fetch repositories");
  }
};
