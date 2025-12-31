
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhancePrompt = async (userInput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Enhance this image generation prompt to be more artistic, detailed, and cinematic: "${userInput}". Only return the enhanced prompt text, nothing else.`,
  });
  return response.text || userInput;
};

export const getSearchKeywords = async (userInput: string): Promise<string[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this description: "${userInput}", provide 3 simple English keywords for searching stock footage.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  try {
    return JSON.parse(response.text);
  } catch {
    return [userInput];
  }
};
