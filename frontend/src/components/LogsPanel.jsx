import React, { useEffect, useRef } from 'react';

export default function LogsPanel({ logs }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 backdrop-blur-xs flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Console Logs</h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-600 select-none">
          {logs.length} line{logs.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex-1 bg-zinc-950/80 border border-zinc-900 rounded-lg p-4 font-mono text-[11px] text-zinc-300 overflow-y-auto max-h-[300px] text-left space-y-1.5 shadow-inner">
        {logs.length > 0 ? (
          <>
            {logs.map((logLine, idx) => {
              const isError = logLine.toLowerCase().includes('fail') || logLine.toLowerCase().includes('error');
              const isSuccess = logLine.toLowerCase().includes('success') || logLine.toLowerCase().includes('complete');
              
              return (
                <div
                  key={idx}
                  className={`leading-relaxed border-l-2 pl-2.5 py-0.5 transition-all duration-300 ${
                    isError ? 'border-rose-500/80 text-rose-400 bg-rose-950/5' :
                    isSuccess ? 'border-emerald-500/80 text-emerald-400 bg-emerald-950/5' :
                    'border-zinc-850 text-zinc-400'
                  }`}
                >
                  <span className="text-[9px] text-zinc-700 mr-2.5 select-none">{String(idx + 1).padStart(2, '0')}</span>
                  {logLine}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-700 select-none py-12">
            <svg className="h-5 w-5 mb-2 opacity-40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-zinc-650 text-[10px]">Console output is empty. Run the agent to inspect output.</span>
          </div>
        )}
      </div>
    </div>
  );
}
