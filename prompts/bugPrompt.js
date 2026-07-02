export const buildBugPrompt = (code, language, errorMessage = "") => {
  return `You are an expert ${language} debugger.

Analyze the following code and fix any bugs:

\`\`\`${language}
${code}
\`\`\`

${errorMessage ? `Reported error: ${errorMessage}` : ""}

Respond in this exact format:
1. A short explanation of the bug (2-3 sentences max)
2. The corrected code in a single markdown code block`;
};
