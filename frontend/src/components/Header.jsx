import React from 'react';

/**
 * Header — Top navigation bar styled like a premium cloud dashboard (Vercel/Linear).
 * Subtle borders, breadcrumbs, and a system health indicator.
 */
export default function Header({ status }) {
  const badgeConfig = {
    idle: { label: 'Idle', dot: 'bg-zinc-400' },
    running: { label: 'Running', dot: 'bg-blue-600 animate-pulse' },
    completed: { label: 'Completed', dot: 'bg-green-600' },
    error: { label: 'Failed', dot: 'bg-red-600' }
  };

  const currentStatus = badgeConfig[status] || badgeConfig.idle;

  return (
    <header className="border-b border-zinc-200/60 bg-white select-none">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Minimalist Logo Icon */}
          <div className="h-6 w-6 rounded bg-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-zinc-900 tracking-tight">
              Website Automation
            </span>
            <span className="text-zinc-300 font-light">/</span>
            <span className="text-zinc-500 font-normal">
              agent-04
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-zinc-100 text-[10px] font-mono font-medium text-zinc-600 uppercase tracking-wider ml-1">
              v1.0.0
            </span>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="flex items-center gap-4">
          {/* API Health indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-[11px] text-zinc-500">API Connected</span>
          </div>

          <div className="h-4 w-[1px] bg-zinc-200 hidden sm:block" />

          {/* Active status indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-zinc-200/80 bg-zinc-50/50 shadow-2xs">
            <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`} />
            <span className="text-[11px] font-mono font-medium text-zinc-700">
              {currentStatus.label}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
