import React from 'react';

/**
 * Footer — one-line attribution strip. Thin top border.
 */
export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 mt-20 select-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-normal">
          Website Automation Agent — Internal Developer Console
        </span>
        <span className="text-[10px] text-zinc-400 font-mono tracking-tight bg-zinc-50 border border-zinc-200/50 rounded px-1.5 py-0.5">
          Vite + React + Playwright
        </span>
      </div>
    </footer>
  );
}
