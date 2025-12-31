
import React, { useState, useEffect } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ImageStudio from './components/ImageStudio';
import VideoStudio from './components/VideoStudio';
import EditorStudio from './components/EditorStudio';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.IMAGE_GEN);
  const [pexelsKey, setPexelsKey] = useState<string>(localStorage.getItem('pexels_api_key') || '');

  useEffect(() => {
    localStorage.setItem('pexels_api_key', pexelsKey);
  }, [pexelsKey]);

  const renderView = () => {
    switch (currentView) {
      case View.IMAGE_GEN:
        return <ImageStudio />;
      case View.VIDEO_SEARCH:
        return <VideoStudio pexelsKey={pexelsKey} />;
      case View.VIDEO_EDITOR:
        return <EditorStudio />;
      case View.SETTINGS:
        return <Settings pexelsKey={pexelsKey} setPexelsKey={setPexelsKey} />;
      default:
        return <ImageStudio />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
