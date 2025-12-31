
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-zinc-400 font-medium">Dashboard / <span className="text-white">Workspace</span></h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-semibold text-zinc-400">
          Free Tier
        </div>
        <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
      </div>
    </header>
  );
};

export default Header;
