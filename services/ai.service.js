import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const generateAIResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    logger.error(`Gemini API error: ${error.message}`);
    throw new ApiError(502, "AI service failed to generate a response");
  }
};
