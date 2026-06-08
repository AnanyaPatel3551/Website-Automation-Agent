import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ConfigurationPanel from './components/ConfigurationPanel';
import ExecutionTimeline from './components/ExecutionTimeline';
import ScreenshotPreview from './components/ScreenshotPreview';
import LogsPanel from './components/LogsPanel';
import StatusCard from './components/StatusCard';
import Footer from './components/Footer';

const INITIAL_STEPS = {
  browser_opened:    'idle',
  page_loaded:       'idle',
  page_scrolled:     'idle',
  elements_detected: 'idle',
  form_filled:       'idle',
  screenshot_taken:  'idle',
};

const STEPS_LIST = [
  { id: 'browser_opened',   label: 'Launch Browser context' },
  { id: 'page_loaded',      label: 'Navigate and Load Target URL' },
  { id: 'page_scrolled',    label: 'Scroll Page viewport' },
  { id: 'elements_detected',label: 'Detect Form fields' },
  { id: 'form_filled',      label: 'Fill Form fields automatically' },
  { id: 'screenshot_taken', label: 'Capture and Save Screenshot' }
];

export default function App() {
  const [url, setUrl]               = useState('https://ui.shadcn.com/docs/forms/react-hook-form');
  const [title, setTitle]           = useState('Login button not working');
  const [description, setDescription] = useState(
    "I'm having an issue where clicking the login button on mobile Safari does nothing. No request is sent and no validation error appears."
  );

  const [status, setStatus]               = useState('idle');
  const [isRunning, setIsRunning]         = useState(false);
  const [logs, setLogs]                   = useState([]);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [stepStates, setStepStates]       = useState(INITIAL_STEPS);
  const [duration, setDuration]           = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

  const handleRunAgent = () => {
    setIsRunning(true);
    setStatus('running');
    setLogs([]);
    setScreenshotUrl(null);
    setStepStates(INITIAL_STEPS);
    setDuration(0);

    // Setup active duration timer
    if (timerRef.current) clearInterval(timerRef.current);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setDuration((Date.now() - startTime) / 1000);
    }, 100);

    const params = new URLSearchParams({ url, title, description }).toString();
    const es = new EventSource(`${API_BASE}/api/run?${params}`);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'log') {
          addLog(data.message);
        } else if (data.type === 'step') {
          setStepStates((prev) => ({ ...prev, [data.step]: data.status }));

          if (data.step === 'screenshot_taken' && data.status === 'completed' && data.filename) {
            setScreenshotUrl(`${API_BASE}/screenshots/${data.filename}`);
          }
        } else if (data.type === 'complete') {
          setIsRunning(false);
          setStatus(data.success ? 'completed' : 'error');

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          if (data.success) {
            addLog('Agent completed successfully.');
          } else {
            addLog(`Error: ${data.error}`);
            // Mark any still-running steps as failed
            setStepStates((prev) => {
              const next = { ...prev };
              Object.keys(next).forEach((k) => {
                if (next[k] === 'idle' || next[k] === 'running') next[k] = 'failed';
              });
              return next;
            });
          }
          es.close();
        }
      } catch (err) {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      addLog('Connection to backend lost.');
      setIsRunning(false);
      setStatus('error');
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setStepStates((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (next[k] === 'idle' || next[k] === 'running') next[k] = 'failed';
        });
        return next;
      });
      es.close();
    };
  };

  // Compute metrics for StatusCard
  const completedSteps = Object.values(stepStates).filter(s => s === 'completed').length;
  const totalSteps = STEPS_LIST.length;

  // Find active step or define ending label
  const activeStepObj = STEPS_LIST.find(s => stepStates[s.id] === 'running');
  const activeStepLabel = activeStepObj 
    ? activeStepObj.label 
    : (status === 'completed' ? 'Done' : (status === 'error' ? 'Failed' : 'None'));

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header status={status} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col gap-8">
        
        {/* Title area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
              Website Automation Dashboard
            </h1>
            <p className="text-xs text-zinc-500 max-w-xl leading-relaxed">
              Launch, orchestrate, and observe a Playwright browser agent task. Fill input parameters, run the automation, and analyze screenshot frames and system logs.
            </p>
          </div>
        </div>

        {/* 12-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Area: Configuration & Checklist (Left 4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ConfigurationPanel
              url={url}           setUrl={setUrl}
              title={title}       setTitle={setTitle}
              description={description} setDescription={setDescription}
              onRun={handleRunAgent}
              isRunning={isRunning}
            />

            <ExecutionTimeline stepStates={stepStates} />
          </div>

          {/* Main Area: Status, Screenshot & Console Logs (Right 8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <StatusCard
              status={status}
              duration={duration}
              completedSteps={completedSteps}
              totalSteps={totalSteps}
              activeStepLabel={activeStepLabel}
              targetUrl={url}
            />

            <ScreenshotPreview
              screenshotUrl={screenshotUrl}
              targetUrl={url}
            />

            <LogsPanel logs={logs} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
