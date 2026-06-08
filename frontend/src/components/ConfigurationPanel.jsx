import React, { useState } from 'react';

/**
 * ConfigurationPanel — Config panel for launching agent.
 * Elegant UI with hero Target URL input and collapsible form data configurations.
 */
export default function ConfigurationPanel({
  url, setUrl,
  title, setTitle,
  description, setDescription,
  onRun,
  isRunning
}) {
  const [showAdvanced, setShowAdvanced] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRun();
  };

  return (
    <section className="bg-white border border-zinc-200/80 rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Configuration
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Hero URL Input Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url-input" className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Target URL
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-zinc-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <input
              id="url-input"
              type="url"
              required
              disabled={isRunning}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full text-sm text-zinc-850 bg-white border border-zinc-250 rounded-md pl-9 pr-3 py-2.5 placeholder-zinc-400 outline-none transition-all hover:border-zinc-350 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950/20 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="https://ui.shadcn.com/docs/forms/react-hook-form"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Collapsible Form Fill Data Section */}
        <div className="border border-zinc-200 rounded-md overflow-hidden bg-zinc-50/50">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-left bg-zinc-50 hover:bg-zinc-100/60 transition-colors border-b border-zinc-200 select-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                Automated Form Payload
              </span>
            </div>
            <svg
              className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-200 overflow-hidden ${
              showAdvanced ? 'max-h-[380px] border-t border-zinc-100 p-4 flex flex-col gap-4' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title-input" className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                Bug Title (Title Field)
              </label>
              <input
                id="title-input"
                type="text"
                required={showAdvanced}
                disabled={isRunning}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs text-zinc-800 bg-white border border-zinc-200 rounded-md px-3 py-2 placeholder-zinc-350 outline-none transition-all hover:border-zinc-300 focus:border-zinc-950 disabled:opacity-50"
                placeholder="Login button not working"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="description-input" className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                Bug Description (Description Field)
              </label>
              <textarea
                id="description-input"
                required={showAdvanced}
                disabled={isRunning}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs text-zinc-800 bg-white border border-zinc-200 rounded-md px-3 py-2 placeholder-zinc-350 outline-none resize-none transition-all hover:border-zinc-300 focus:border-zinc-950 disabled:opacity-50"
                placeholder="Describe the bug details..."
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isRunning}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium bg-zinc-950 text-white hover:bg-zinc-800 active:bg-zinc-950 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-xs border border-zinc-950"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Running browser session…</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Run Agent Session</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
