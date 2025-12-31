
import React, { useState } from 'react';
import { searchPexelsVideos } from '../services/media';
import { getSearchKeywords } from '../services/gemini';
import { StockVideo } from '../types';

interface VideoStudioProps {
  pexelsKey: string;
}

const VideoStudio: React.FC<VideoStudioProps> = ({ pexelsKey }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<StockVideo[]>([]);
  const [isSmartSuggesting, setIsSmartSuggesting] = useState(false);

  const handleSearch = async (overrideQuery?: string) => {
    const searchQuery = overrideQuery || query;
    if (!searchQuery.trim() || !pexelsKey) return;
    
    setLoading(true);
    try {
      const results = await searchPexelsVideos(searchQuery, pexelsKey);
      setVideos(results);
    } catch (error) {
      alert("Error fetching videos. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSmartSuggest = async () => {
    if (!query.trim()) return;
    setIsSmartSuggesting(true);
    try {
      const keywords = await getSearchKeywords(query);
      if (keywords.length > 0) {
        handleSearch(keywords[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSmartSuggesting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Stock Footage Finder</h1>
          <p className="text-zinc-400">Find high-quality B-roll for your projects using Pexels Library.</p>
        </div>

        {!pexelsKey && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-amber-500 text-sm">
            ⚠️ Please add your Pexels API Key in Settings to use this feature.
          </div>
        )}

        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cinematic drone shots, nature, urban life..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSmartSuggest}
              disabled={isSmartSuggesting || !query}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20 transition-all"
            >
              {isSmartSuggesting ? 'Thinking...' : 'AI Suggest'}
            </button>
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !pexelsKey}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div key={vid.id} className="group bg-[#121214] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg flex flex-col">
            <div className="relative aspect-video">
              <img src={vid.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                  href={vid.video_files[0]?.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"
                >
                  ▶️
                </a>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold">
                {vid.duration}s
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400 italic">By {vid.user.name}</span>
                <span className="text-xs bg-zinc-800 px-2 py-1 rounded font-bold uppercase tracking-wider">
                  {vid.video_files[0]?.quality}
                </span>
              </div>
              <a
                href={vid.video_files[0]?.link}
                download
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-bold rounded-lg text-sm text-center transition-all"
              >
                Get Footage
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStudio;
