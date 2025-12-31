
import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const EditorStudio: React.FC = () => {
  const [ffmpeg] = useState(() => new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    try {
      setStatus('Đang tải bộ công cụ FFmpeg...');
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
      setStatus('Sẵn sàng xử lý');
    } catch (error) {
      console.error(error);
      setStatus('Lỗi khi tải FFmpeg. Vui lòng kiểm tra kết nối.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setOutputVideo(null);
    }
  };

  const processVideo = async (action: 'mute' | 'compress') => {
    if (!videoFile || !loaded) return;
    setProcessing(true);
    setProgress(0);

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    try {
      setStatus('Đang ghi file vào hệ thống ảo...');
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

      if (action === 'mute') {
        setStatus('Đang loại bỏ âm thanh...');
        await ffmpeg.exec(['-i', 'input.mp4', '-an', '-c:v', 'copy', 'output.mp4']);
      } else if (action === 'compress') {
        setStatus('Đang nén video (có thể mất vài phút)...');
        await ffmpeg.exec(['-i', 'input.mp4', '-vcodec', 'libx264', '-crf', '28', 'output.mp4']);
      }

      setStatus('Đang xuất file...');
      const data = await ffmpeg.readFile('output.mp4');
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'video/mp4' }));
      setOutputVideo(url);
      setStatus('Hoàn thành!');
    } catch (error) {
      console.error(error);
      setStatus('Lỗi trong quá trình xử lý');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Video Editor Pro
            </h1>
            <p className="text-zinc-400 mt-1">Xử lý video 100% tại máy khách, bảo mật và nhanh chóng.</p>
          </div>
          {!loaded && (
            <div className="flex items-center gap-2 text-amber-500 text-sm font-medium animate-pulse">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              Đang khởi tạo engine...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="group relative border-2 border-dashed border-zinc-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 hover:border-emerald-500/50 transition-all bg-zinc-900/30">
              <div className="text-5xl">🎞️</div>
              <div>
                <p className="font-bold text-lg">Kéo thả video của bạn</p>
                <p className="text-sm text-zinc-500">Hỗ trợ MP4, WEBM tối đa 50MB</p>
              </div>
              <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" id="video-upload" />
              <label htmlFor="video-upload" className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm cursor-pointer hover:bg-zinc-200 transition-all active:scale-95">
                Chọn file từ máy
              </label>
            </div>

            {videoFile && (
              <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 flex items-center justify-between animate-in slide-in-from-left-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center font-bold">
                    MP4
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate text-sm">{videoFile.name}</p>
                    <p className="text-xs text-zinc-500">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
                <button onClick={() => setVideoFile(null)} className="p-2 text-zinc-500 hover:text-red-500">✕</button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={!videoFile || processing || !loaded}
                onClick={() => processVideo('mute')}
                className="p-5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-2xl border border-zinc-700/50 transition-all text-left group"
              >
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">🔇</span>
                <p className="font-bold text-sm">Xóa âm thanh</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase">Mute Audio</p>
              </button>
              <button
                disabled={!videoFile || processing || !loaded}
                onClick={() => processVideo('compress')}
                className="p-5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-2xl border border-zinc-700/50 transition-all text-left group"
              >
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">📉</span>
                <p className="font-bold text-sm">Nén dung lượng</p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase">Compress H.264</p>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black rounded-3xl aspect-video relative overflow-hidden flex items-center justify-center shadow-2xl border border-zinc-800">
              {outputVideo ? (
                <video src={outputVideo} className="w-full h-full object-contain" controls />
              ) : videoFile ? (
                <video ref={videoRef} src={URL.createObjectURL(videoFile)} className="w-full h-full object-contain" controls />
              ) : (
                <div className="text-zinc-700 flex flex-col items-center gap-2">
                  <span className="text-4xl">📺</span>
                  <span className="text-xs font-medium uppercase tracking-widest">Preview Window</span>
                </div>
              )}
            </div>

            {processing && (
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-emerald-500">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    {status}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {outputVideo && (
              <a
                href={outputVideo}
                download="studio-ai-export.mp4"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 animate-bounce"
              >
                <span>📥</span> Tải Video Đã Xử Lý
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl flex items-start gap-4">
        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">💡</div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          <strong className="text-emerald-400">Ghi chú:</strong> FFmpeg.wasm sử dụng công nghệ WebAssembly để chạy lệnh trực tiếp trên máy của bạn. Tốc độ xử lý phụ thuộc hoàn toàn vào CPU. Video lớn hoặc tác vụ nén có thể làm nóng máy, hãy kiên nhẫn!
        </p>
      </div>
    </div>
  );
};

export default EditorStudio;
