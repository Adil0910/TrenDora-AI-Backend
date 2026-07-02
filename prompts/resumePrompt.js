export const buildResumePrompt = (resumeText, targetRole = "") => {
  return `You are an expert technical recruiter and resume reviewer.

Analyze the following resume${targetRole ? ` for a "${targetRole}" role` : ""}:

"""
${resumeText}
"""

Respond ONLY in valid JSON with this exact structure, no markdown, no extra text:
{
  "score": <number 0-100>,
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "suggestions": ["...", "..."]
}`;
};
