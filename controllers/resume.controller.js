import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  analyzeResume,
  getUserResumes,
  removeResume,
} from "../services/resume.service.js";

export const analyzeResumeHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "Resume file is required");
    }

    const { targetRole } = req.body;
    const resume = await analyzeResume(req.user._id, req.file, targetRole);

    res.status(201).json(new ApiResponse(201, "Resume analyzed successfully", resume));
  } catch (error) {
    next(error);
  }
};

export const getResumesHandler = async (req, res, next) => {
  try {
    const resumes = await getUserResumes(req.user._id);
    res.status(200).json(new ApiResponse(200, "Resumes fetched", resumes));
  } catch (error) {
    next(error);
  }
};

export const deleteResumeHandler = async (req, res, next) => {
  try {
    await removeResume(req.params.resumeId);
    res.status(200).json(new ApiResponse(200, "Resume deleted"));
  } catch (error) {
    next(error);
  }
};
