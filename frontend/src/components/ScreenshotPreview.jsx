import React from 'react';

export default function ScreenshotPreview({ screenshotUrl }) {
  const handleDownload = () => {
    if (!screenshotUrl) return;
    const a = document.createElement('a');
    a.href = screenshotUrl;
    a.download = `agent-screenshot-${Date.now()}.png`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 backdrop-blur-xs flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Browser Output</h2>
        </div>
        {screenshotUrl && (
          <button
            onClick={handleDownload}
            className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-all border border-zinc-850"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center rounded-lg border border-zinc-800 bg-zinc-950/60 min-h-[300px] overflow-hidden relative group">
        {screenshotUrl ? (
          <div className="w-full h-full flex flex-col">
            {/* Mock browser header */}
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-zinc-900 bg-zinc-900/20">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800"></span>
              <div className="flex-1 max-w-[240px] mx-auto h-4.5 rounded-md bg-zinc-950 text-[8px] font-mono text-zinc-600 flex items-center justify-center truncate px-2 select-none border border-zinc-900">
                {screenshotUrl.substring(screenshotUrl.lastIndexOf('/') + 1)}
              </div>
            </div>
            {/* Image viewer */}
            <div className="flex-1 overflow-auto p-3 max-h-[360px] flex items-center justify-center">
              <img
                src={screenshotUrl}
                alt="Browser Automation Screenshot"
                className="max-w-full rounded border border-zinc-900 shadow-xl shadow-black/30 object-contain hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="p-3 rounded-full bg-zinc-900 text-zinc-700 border border-zinc-850">
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-400">Preview Waiting</span>
              <span className="text-[10px] text-zinc-650 mt-1 max-w-[200px] leading-relaxed">
                Run the agent to automatically capture the form output.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
