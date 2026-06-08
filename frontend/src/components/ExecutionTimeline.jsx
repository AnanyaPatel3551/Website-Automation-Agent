import React from 'react';

const STEPS = [
  { id: 'browser_opened',   label: 'Launch Browser context' },
  { id: 'page_loaded',      label: 'Navigate and Load Target URL' },
  { id: 'page_scrolled',    label: 'Scroll Page viewport' },
  { id: 'elements_detected',label: 'Detect Form fields' },
  { id: 'form_filled',      label: 'Fill Form fields automatically' },
  { id: 'screenshot_taken', label: 'Capture and Save Screenshot' }
];

function StepRow({ label, status, isLast }) {
  const isIdle = status === 'idle';
  const isRunning = status === 'running';
  const isDone = status === 'completed';
  const isFailed = status === 'failed';

  return (
    <div className="flex gap-4 items-start relative pb-6 group select-none">
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className={`absolute left-2 top-4 bottom-0 w-[1px] -ml-[0.5px] transition-colors duration-200 ${
            isDone ? 'bg-zinc-900' : 'bg-zinc-200'
          }`}
        />
      )}

      {/* Icon Node */}
      <div className="relative z-10 shrink-0 mt-0.5">
        {isIdle && (
          <div className="h-4 w-4 rounded-full border border-zinc-300 bg-white flex items-center justify-center" />
        )}
        {isRunning && (
          <div className="h-4 w-4 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin bg-white" />
        )}
        {isDone && (
          <div className="h-4 w-4 rounded-full bg-zinc-950 flex items-center justify-center shadow-xs">
            <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {isFailed && (
          <div className="h-4 w-4 rounded-full bg-rose-650 flex items-center justify-center shadow-xs">
            <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Step Label & status text */}
      <div className="flex flex-col gap-0.5">
        <span className={`text-xs transition-colors duration-150 ${
          isIdle ? 'text-zinc-400 font-normal' :
          isRunning ? 'text-zinc-950 font-semibold' :
          isDone ? 'text-zinc-850 font-medium' :
          isFailed ? 'text-rose-600 font-semibold' : ''
        }`}>
          {label}
        </span>
        
        {isRunning && (
          <span className="text-[10px] text-zinc-500 font-mono">
            processing...
          </span>
        )}
        {isDone && (
          <span className="text-[10px] text-zinc-400 font-mono">
            completed
          </span>
        )}
        {isFailed && (
          <span className="text-[10px] text-rose-500 font-mono">
            failed
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ExecutionTimeline — Displays steps of the browser automation run connected by a tree pipeline.
 */
export default function ExecutionTimeline({ stepStates }) {
  const getStatus = (id) => stepStates[id] ?? 'idle';

  return (
    <section className="bg-white border border-zinc-200/80 rounded-lg p-6">
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-6">
        Execution Pipeline
      </h2>
      <div className="flex flex-col">
        {STEPS.map((step, idx) => (
          <StepRow
            key={step.id}
            label={step.label}
            status={getStatus(step.id)}
            isLast={idx === STEPS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
