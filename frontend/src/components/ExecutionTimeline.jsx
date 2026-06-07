import React from 'react';

const STEPS_DATA = [
  { id: 'browser_opened', label: 'Browser Opened', desc: 'Initialize Chromium instance' },
  { id: 'page_loaded', label: 'Page Loaded', desc: 'Navigate to target URL' },
  { id: 'page_scrolled', label: 'Page Scrolled', desc: 'Scroll down to reveal form' },
  { id: 'elements_detected', label: 'Elements Detected', desc: 'Identify form elements' },
  { id: 'form_filled', label: 'Form Filled', desc: 'Fill inputs automatically' },
  { id: 'screenshot_taken', label: 'Screenshot Taken', desc: 'Capture filled state image' }
];

export default function ExecutionTimeline({ stepStates }) {
  const getStepStatus = (id) => {
    return stepStates[id] || 'idle';
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'running':
        return (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-zinc-900/50 text-zinc-700 border border-zinc-800">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div>
          </div>
        );
    }
  };

  const getStepClass = (status) => {
    switch (status) {
      case 'completed':
        return 'border-emerald-500/15 bg-emerald-950/5';
      case 'running':
        return 'border-purple-500/30 bg-purple-950/10';
      case 'failed':
        return 'border-rose-500/20 bg-rose-950/5';
      case 'idle':
      default:
        return 'border-zinc-800/40 bg-zinc-950/10 opacity-50';
    }
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 backdrop-blur-xs flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Execution Timeline</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2.5">
        {STEPS_DATA.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div
              key={step.id}
              className={`flex items-start gap-4.5 p-3 rounded-lg border transition-all duration-300 ${getStepClass(status)}`}
            >
              <div className="mt-0.5 shrink-0">{getStepIcon(status)}</div>
              <div className="flex flex-col text-left">
                <span className={`text-xs font-bold ${
                  status === 'running' ? 'text-purple-400' :
                  status === 'completed' ? 'text-emerald-400' :
                  status === 'failed' ? 'text-rose-400' : 'text-zinc-500'
                }`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-zinc-600 font-mono mt-0.5">{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
