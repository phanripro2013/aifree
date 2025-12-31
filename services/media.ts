
import { StockVideo } from '../types';

export const generateImageUrl = (prompt: string): string => {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 1000000);
  return `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;
};

export const searchPexelsVideos = async (query: string, apiKey: string): Promise<StockVideo[]> => {
  if (!apiKey) return [];
  
  const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=12`, {
    headers: {
      Authorization: apiKey
    }
  });
  
  if (!response.ok) throw new Error('Failed to fetch from Pexels');
  
  const data = await response.json();
  return data.videos;
};
