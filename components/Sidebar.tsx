
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: View.IMAGE_GEN, label: 'Image Gen', icon: '🎨' },
    { id: View.VIDEO_SEARCH, label: 'Video Stock', icon: '🎬' },
    { id: View.VIDEO_EDITOR, label: 'Editor (BETA)', icon: '🎞️' },
    { id: View.SETTINGS, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#121214] border-r border-zinc-800 flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
          S
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight">Studio AI</span>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800 hidden md:block">
        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-2">Power by</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300 italic">Gemini 3.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
