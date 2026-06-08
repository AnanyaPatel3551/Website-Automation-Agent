import React, { useEffect, useRef, useState } from 'react';

/**
 * LogsPanel — Scrollable log area with monospace font, simulating a professional build terminal.
 * Muted syntax highlighting for INFO, SUCCESS, and ERROR logs, plus copy-to-clipboard functionality.
 */
export default function LogsPanel({ logs }) {
  const bottomRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCopy = () => {
    if (logs.length === 0) return;
    const logText = logs.join('\n');
    navigator.clipboard.writeText(logText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Console Output
          </h2>
          {logs.length > 0 && (
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 tabular-nums">
              {logs.length} line{logs.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {logs.length > 0 && (
          <button
            onClick={handleCopy}
            className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded px-2.5 py-1 transition-all inline-flex items-center gap-1.5 shadow-2xs select-none cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Logs</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Terminal Display */}
      <div className="border border-zinc-200/80 rounded-lg bg-zinc-950 p-4 font-mono shadow-xs">
        <div className="overflow-y-auto max-h-60 pr-2 flex flex-col gap-1.5">
          {logs.length === 0 ? (
            <div className="flex items-center gap-2 py-6 text-zinc-500 text-xs select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-pulse" />
              <span>Awaiting agent session start...</span>
            </div>
          ) : (
            <>
              {logs.map((line, i) => {
                // Determine log category / color
                const isError = /error|failed/i.test(line);
                const isSuccess = /success|completed/i.test(line);
                const isWarning = /warning|warn/i.test(line);

                let logColor = 'text-zinc-350';
                let tag = '';
                
                if (isError) {
                  logColor = 'text-rose-450';
                  tag = '[ERR]';
                } else if (isSuccess) {
                  logColor = 'text-emerald-400';
                  tag = '[OK]';
                } else if (isWarning) {
                  logColor = 'text-amber-400';
                  tag = '[WRN]';
                } else {
                  tag = '[INF]';
                }

                return (
                  <div key={i} className="flex items-baseline gap-3 text-xs leading-relaxed group">
                    {/* Line index */}
                    <span className="text-zinc-700 text-[10px] shrink-0 select-none w-5 text-right font-medium">
                      {i + 1}
                    </span>
                    
                    {/* Log tag */}
                    <span className={`text-[10px] font-semibold select-none tracking-wider shrink-0 ${
                      isError ? 'text-rose-500/80' : 
                      isSuccess ? 'text-emerald-500/80' : 
                      isWarning ? 'text-amber-500/80' : 
                      'text-zinc-550'
                    }`}>
                      {tag}
                    </span>

                    {/* Log content */}
                    <span className={`${logColor} break-all whitespace-pre-wrap flex-1`}>
                      {line}
                    </span>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
