import React from 'react';

export default function Header({ status }) {
  const getStatusBadge = () => {
    switch (status) {
      case 'idle':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
            Idle
          </span>
        );
      case 'running':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/40 text-purple-400 border border-purple-900/40">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping"></span>
            Running
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Success
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/40 text-rose-400 border border-rose-900/40">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-md shadow-purple-500/10">
              <svg className="h-5.5 w-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-base font-bold text-zinc-100 tracking-tight leading-none m-0 p-0">Website Automation Agent</h1>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-1">Assignment 04 • Playwright + React</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge()}
          </div>
        </div>
      </div>
    </header>
  );
}
