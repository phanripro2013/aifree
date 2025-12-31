
import React, { useState } from 'react';
import { generateImageUrl } from '../services/media';
import { enhancePrompt } from '../services/gemini';
import { GeneratedImage } from '../types';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    try {
      const url = generateImageUrl(prompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now(),
      };
      setImages([newImage, ...images]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const enhanced = await enhancePrompt(prompt);
      setPrompt(enhanced);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const downloadImage = async (url: string, name: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `ai-studio-${name.slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Image Generator</h1>
          <p className="text-zinc-400">Transform your imagination into visuals powered by Flux model.</p>
        </div>

        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with floating neon structures, high quality, cinematic..."
            className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
          />
          <button
            onClick={handleEnhance}
            disabled={isEnhancing || !prompt}
            className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 backdrop-blur rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors border border-zinc-700 disabled:opacity-50"
          >
            {isEnhancing ? '🪄 Enhancing...' : '🪄 AI Enhance'}
          </button>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
        >
          {loading ? 'Generative Engine Starting...' : 'Generate Magic'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-[#121214] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg hover:border-indigo-500/50 transition-all">
            <img 
              src={img.url} 
              alt={img.prompt} 
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end gap-3">
              <p className="text-sm text-zinc-200 line-clamp-2 italic">"{img.prompt}"</p>
              <button 
                onClick={() => downloadImage(img.url, img.prompt)}
                className="w-full py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors text-sm"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStudio;
