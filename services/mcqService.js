import { askOpenRouter } from '../utils/openRouterClient.js';

export const generateMCQs = async (text) => {
  const prompt = `Generate 10 multiple-choice questions based on the following study notes. Each question should include:
- "question" (string)
- "options" (array of 4 strings: A, B, C, D)
- "answer" (correct option: A, B, C, or D)

Return the result as a JSON array strictly

Study Notes:
"""
${text}
"""
`;

  const aiResponse = await askOpenRouter(prompt);

  try {
    console.log({prompt})
    console.log({aiResponse})
    const start = aiResponse.indexOf('[');
    const end = aiResponse.lastIndexOf(']') + 1;
    return JSON.parse(aiResponse.slice(start, end));
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return { error: 'Invalid response format from AI' };
  }
};
