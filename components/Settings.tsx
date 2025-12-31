
import React from 'react';

interface SettingsProps {
  pexelsKey: string;
  setPexelsKey: (key: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ pexelsKey, setPexelsKey }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6">Preferences</h1>
        
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-zinc-300">Pexels API Key</h3>
              <a 
                href="https://www.pexels.com/api/new/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-400 text-xs hover:underline"
              >
                Get a free key here
              </a>
            </div>
            <input
              type="password"
              value={pexelsKey}
              onChange={(e) => setPexelsKey(e.target.value)}
              placeholder="Enter your Pexels API Key..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <p className="text-xs text-zinc-500 italic">
              Required for the Video Stock search functionality. This is stored only in your browser's local storage.
            </p>
          </section>

          <div className="h-px bg-zinc-800 w-full" />

          <section className="space-y-4">
            <h3 className="font-bold text-zinc-300">Environment Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-1">Theme</p>
                <p className="font-bold text-sm">Deep Dark Mode (Active)</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-1">Storage Used</p>
                <p className="font-bold text-sm">{(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <h3 className="font-bold text-zinc-300 mb-4 flex items-center gap-2">
              <span>🚀</span> Deployment Status
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                GitHub Pages Ready (SPA Mode)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Client-Side Only Logic
              </li>
              <li className="flex items-center gap-2 text-zinc-500">
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                SharedArrayBuffer (Requires headers for FFmpeg)
              </li>
            </ul>
          </section>
        </div>
      </div>
      
      <div className="text-center text-zinc-600 text-xs">
        Studio AI v1.0.0-alpha • Built for the future of web creativity.
      </div>
    </div>
  );
};

export default Settings;
