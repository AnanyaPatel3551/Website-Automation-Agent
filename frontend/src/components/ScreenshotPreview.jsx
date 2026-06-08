import React from 'react';

/**
 * ScreenshotPreview — Displays the captured browser screenshot inside a mock browser chrome frame.
 * Modern engineering tool layout with empty states and action buttons.
 */
export default function ScreenshotPreview({ screenshotUrl, targetUrl }) {
  const filename = screenshotUrl ? screenshotUrl.split('/').pop() : null;

  // Extract hostname or path for the address bar
  let displayUrl = 'about:blank';
  if (targetUrl) {
    try {
      // Validate url format
      const parsed = new URL(targetUrl);
      displayUrl = parsed.origin + parsed.pathname;
      if (displayUrl.length > 50) {
        displayUrl = displayUrl.substring(0, 50) + '...';
      }
    } catch (e) {
      displayUrl = targetUrl;
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Browser Viewport
        </h2>
        {screenshotUrl && (
          <div className="flex items-center gap-2">
            <a
              href={screenshotUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded px-2.5 py-1 transition-all inline-flex items-center gap-1 shadow-2xs select-none"
            >
              <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Tab
            </a>
            
            <a
              href={screenshotUrl}
              download={filename}
              className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded px-2.5 py-1 transition-all inline-flex items-center gap-1 shadow-2xs select-none"
            >
              <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        )}
      </div>

      {/* Mock Browser Container */}
      <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-xs">
        
        {/* Browser Chrome Header */}
        <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2 flex items-center gap-4 select-none">
          {/* Mac-style traffic light dots */}
          <div className="flex gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          </div>

          {/* Navigation controls */}
          <div className="hidden sm:flex gap-1 shrink-0 text-zinc-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* URL bar */}
          <div className="flex-1 max-w-md mx-auto bg-white border border-zinc-200 rounded-md py-1 px-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 truncate w-full">
              {/* Lock Icon */}
              <svg className="h-3 w-3 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-mono text-zinc-500 tracking-tight truncate">{displayUrl}</span>
            </div>
            <svg className="h-3 w-3 text-zinc-400 shrink-0 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
            </svg>
          </div>

          {/* Right dummy space */}
          <div className="w-12 shrink-0 hidden sm:block" />
        </div>

        {/* Viewport Screen Content */}
        <div className="bg-zinc-50 flex items-center justify-center min-h-[360px] relative overflow-hidden">
          {screenshotUrl ? (
            <div className="w-full h-full">
              <img
                src={screenshotUrl}
                alt="Viewport screenshot showing form state"
                className="w-full h-auto object-contain block select-none border-b border-zinc-100"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm select-none">
              <div className="h-12 w-12 rounded-full border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 mb-4 bg-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1">
                No Preview Available
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Start the agent session to load the target URL and render the viewport screenshot here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
