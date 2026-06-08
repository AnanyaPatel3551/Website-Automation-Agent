import React from 'react';

/**
 * StatusCard — Premium status control center.
 * Displays overall agent state (Idle, Running, Completed, Failed) with detailed run stats.
 */
export default function StatusCard({ status, duration, completedSteps, totalSteps, activeStepLabel, targetUrl }) {
  // Determine badge styles and labels based on status
  const badgeConfig = {
    idle: {
      label: 'Idle',
      color: 'bg-zinc-100 text-zinc-800 border-zinc-200',
      dot: 'bg-zinc-400',
      description: 'System is ready to start automation.'
    },
    running: {
      label: 'Running',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      dot: 'bg-blue-600 animate-pulse',
      description: 'Executing browser automation tools...'
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-50 text-green-800 border-green-200',
      dot: 'bg-green-600',
      description: 'Browser session finished successfully.'
    },
    error: {
      label: 'Failed',
      color: 'bg-red-50 text-red-800 border-red-200',
      dot: 'bg-red-600',
      description: 'Execution stopped due to a critical error.'
    }
  };

  const current = badgeConfig[status] || badgeConfig.idle;

  // Extract hostname for cleaner display
  let hostname = 'None';
  if (targetUrl) {
    try {
      hostname = new URL(targetUrl).hostname;
    } catch (e) {
      hostname = targetUrl;
    }
  }

  return (
    <section className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Agent Control Panel
        </h2>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.color}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
          {current.label}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-zinc-500 font-normal">
          {current.description}
        </span>
      </div>

      <div className="border-t border-zinc-200/60" />

      {/* Grid of stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
            Duration
          </span>
          <span className="text-sm font-mono font-medium text-zinc-800 tabular-nums">
            {duration ? `${duration.toFixed(1)}s` : '0.0s'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
            Step Progress
          </span>
          <span className="text-sm font-medium text-zinc-800">
            {completedSteps} / {totalSteps}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
            Active Task
          </span>
          <span className="text-sm font-medium text-zinc-800 truncate" title={activeStepLabel || 'None'}>
            {activeStepLabel || 'None'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
            Target Host
          </span>
          <span className="text-sm font-medium text-zinc-800 truncate" title={hostname}>
            {hostname}
          </span>
        </div>
      </div>
    </section>
  );
}
