export const buildCodePrompt = (description, language) => {
  return `You are an expert ${language} developer.

Generate clean, working, production-ready code for the following requirement:

"${description}"

Rules:
- Only return the code, wrapped in a single markdown code block.
- Add short comments only where the logic is non-obvious.
- Do not add explanations outside the code block.`;
};
