import { generateAIResponse } from "../services/ai.service.js";
import { buildCodePrompt } from "../prompts/codePrompt.js";
import { buildBugPrompt } from "../prompts/bugPrompt.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const generateCodeHandler = async (req, res, next) => {
  try {
    const { description, language } = req.body;
    if (!description || !language) {
      throw new ApiError(400, "Description and language are required");
    }

    const prompt = buildCodePrompt(description, language);
    const code = await generateAIResponse(prompt);

    res.status(200).json(new ApiResponse(200, "Code generated successfully", { code }));
  } catch (error) {
    next(error);
  }
};

export const fixBugHandler = async (req, res, next) => {
  try {
    const { code, language, errorMessage } = req.body;
    if (!code || !language) {
      throw new ApiError(400, "Code and language are required");
    }

    const prompt = buildBugPrompt(code, language, errorMessage);
    const result = await generateAIResponse(prompt);

    res.status(200).json(new ApiResponse(200, "Bug analysis complete", { result }));
  } catch (error) {
    next(error);
  }
};
