import pdfParse from "pdf-parse";
import cloudinary from "../config/cloudinary.js";
import { generateAIResponse } from "./ai.service.js";
import { buildResumePrompt } from "../prompts/resumePrompt.js";
import {
  createResume,
  findResumesByUser,
  findResumeById,
  deleteResumeById,
} from "../repositories/resume.repository.js";
import ApiError from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "resumes", resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

export const analyzeResume = async (userId, file, targetRole) => {
  let text;
  try {
    const parsed = await pdfParse(file.buffer);
    text = parsed.text;
  } catch (error) {
    logger.error(`PDF parsing failed: ${error.message}`);
    throw new ApiError(400, "Could not read this PDF file");
  }

  if (!text || text.trim().length < 50) {
    throw new ApiError(400, "Could not extract readable text from this PDF");
  }

  let fileUrl;
  try {
    fileUrl = await uploadToCloudinary(file.buffer);
  } catch (error) {
    logger.error(`Cloudinary upload failed: ${error.message}`);
    throw new ApiError(502, "File upload failed, please check Cloudinary configuration");
  }

  const prompt = buildResumePrompt(text, targetRole);
  const aiRawResponse = await generateAIResponse(prompt);

  let analysis;
  try {
    const cleaned = aiRawResponse.replace(/```json|```/g, "").trim();
    analysis = JSON.parse(cleaned);
  } catch (error) {
    logger.error(`AI response was not valid JSON: ${aiRawResponse}`);
    throw new ApiError(502, "AI returned an invalid response, please retry");
  }

  const resume = await createResume({
    user: userId,
    fileUrl,
    targetRole,
    score: analysis.score,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    suggestions: analysis.suggestions,
  });

  return resume;
};

export const getUserResumes = async (userId) => {
  return findResumesByUser(userId);
};

export const removeResume = async (resumeId) => {
  const resume = await findResumeById(resumeId);
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }
  return deleteResumeById(resumeId);
};
