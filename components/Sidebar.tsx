
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: View.IMAGE_GEN, label: 'Tạo Ảnh AI', icon: '🎨' },
    { id: View.VIDEO_SEARCH, label: 'Kho Video', icon: '🎬' },
    { id: View.VIDEO_EDITOR, label: 'Chỉnh Sửa', icon: '🎞️' },
    { id: View.SETTINGS, label: 'Cài Đặt', icon: '⚙️' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#121214] border-r border-zinc-800 flex flex-col transition-all duration-300 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
          S
        </div>
        <div className="hidden md:block overflow-hidden">
          <span className="font-bold text-lg block leading-none">Creative</span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Studio AI</span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
              currentView === item.id 
                ? 'bg-indigo-600/10 text-indigo-400 shadow-sm' 
                : 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {currentView === item.id && (
              <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full" />
            )}
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="hidden md:block font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800 hidden md:block">
        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-2 tracking-widest">Trình trạng</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-medium text-zinc-300">Hệ thống sẵn sàng</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
