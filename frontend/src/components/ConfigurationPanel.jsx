import React from 'react';

export default function ConfigurationPanel({
  url,
  setUrl,
  title,
  setTitle,
  description,
  setDescription,
  onRun,
  isRunning
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRun();
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 backdrop-blur-xs">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Agent Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="url-input" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
            Target URL
          </label>
          <input
            id="url-input"
            type="url"
            required
            disabled={isRunning}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="title-input" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
            Bug Title (Name Field)
          </label>
          <input
            id="title-input"
            type="text"
            required
            disabled={isRunning}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50"
            placeholder="e.g. Login button not working"
          />
        </div>

        <div>
          <label htmlFor="description-input" className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
            Bug Description (Description Field)
          </label>
          <textarea
            id="description-input"
            required
            disabled={isRunning}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none disabled:opacity-50"
            placeholder="e.g. Describe the steps to reproduce..."
          />
        </div>

        <button
          type="submit"
          disabled={isRunning}
          className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isRunning ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Running Agent
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Agent
            </>
          )}
        </button>
      </form>
    </div>
  );
}
