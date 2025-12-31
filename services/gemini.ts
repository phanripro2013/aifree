
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhancePrompt = async (userInput: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Bạn là chuyên gia về Prompt Art. Hãy nâng cấp yêu cầu sau đây thành một prompt tiếng Anh chi tiết, nghệ thuật và điện ảnh cho mô hình Flux AI: "${userInput}". Chỉ trả về chuỗi prompt tiếng Anh cuối cùng, không giải thích thêm.`,
  });
  return response.text || userInput;
};

export const getSearchKeywords = async (userInput: string): Promise<string[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Phân tích mô tả video này: "${userInput}". Hãy cung cấp 3 từ khóa tìm kiếm (keywords) bằng tiếng Anh đơn giản để tìm footage phù hợp nhất trên Pexels. Trả về mảng JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  try {
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch {
    return [userInput];
  }
};
