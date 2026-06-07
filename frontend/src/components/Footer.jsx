import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/20 py-6 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wide">
              Assignment 04 • Website Automation Agent
            </span>
            <span className="text-[10px] text-zinc-600 mt-1">
              Developed to demonstrate autonomous element detection, UI interaction modeling, and real-time execution feedback.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-850 text-zinc-550 font-mono">
              React 19
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-850 text-zinc-550 font-mono">
              Playwright
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-850 text-zinc-550 font-mono">
              Node Express
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
