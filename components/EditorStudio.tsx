
import React, { useState, useRef } from 'react';

const EditorStudio: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Note: Real ffmpeg.wasm implementation requires COOP/COEP headers on the server
  // and loading the worker scripts from CDN. Here is the UI/UX workflow.
  const processVideo = async () => {
    if (!file) return;
    setProcessing(true);
    setStatus('Initializing FFmpeg Engine...');
    setProgress(10);
    
    // Simulation for demo purposes as ffmpeg.wasm setup is environment-heavy
    setTimeout(() => {
      setStatus('Remuxing video streams...');
      setProgress(40);
      setTimeout(() => {
        setStatus('Injecting metadata...');
        setProgress(70);
        setTimeout(() => {
          setStatus('Finalizing export...');
          setProgress(100);
          setTimeout(() => {
            setProcessing(false);
            alert("Video processing completed! (Simulation)");
          }, 500);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Studio Editor <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full ml-2">BETA</span></h1>
            <p className="text-zinc-400">Client-side processing powered by ffmpeg.wasm.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-500/50 transition-colors bg-zinc-900/50">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-3xl">
                📁
              </div>
              <div>
                <p className="font-bold">Drop your video here</p>
                <p className="text-sm text-zinc-500">MP4, WEBM, MOV supported</p>
              </div>
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                className="hidden" 
                id="video-upload"
              />
              <label 
                htmlFor="video-upload"
                className="px-6 py-2 bg-indigo-600 rounded-lg font-bold text-sm cursor-pointer hover:bg-indigo-500 transition-colors"
              >
                Browse Files
              </label>
            </div>

            {file && (
              <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded flex items-center justify-center font-bold">
                  MP4
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{file.name}</p>
                  <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Operations</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all border border-transparent hover:border-zinc-600">
                  <p className="text-lg">🔇</p>
                  <p className="text-xs font-bold mt-1">Mute Audio</p>
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all border border-transparent hover:border-zinc-600">
                  <p className="text-lg">📐</p>
                  <p className="text-xs font-bold mt-1">Resize 16:9</p>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-black rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center shadow-inner border border-zinc-800">
              {file ? (
                <video 
                  ref={videoRef} 
                  src={URL.createObjectURL(file)} 
                  className="w-full h-full object-contain"
                  controls
                />
              ) : (
                <div className="text-zinc-600 text-sm italic">Preview Window</div>
              )}
            </div>

            <button
              onClick={processVideo}
              disabled={!file || processing}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : 'Run Processing Pipeline'}
            </button>

            {processing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase text-zinc-500">
                  <span>{status}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-600/10 border border-indigo-600/20 p-6 rounded-2xl flex items-start gap-4">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-indigo-300/80 leading-relaxed">
          <strong>Pro Tip:</strong> All processing happens directly on your CPU/GPU inside the browser. No data ever leaves your device, making this studio 100% private and secure. Large files might take some time to process based on your device performance.
        </p>
      </div>
    </div>
  );
};

export default EditorStudio;
