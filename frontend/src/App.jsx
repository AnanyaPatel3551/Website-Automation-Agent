import React, { useState } from 'react';
import Header from './components/Header';
import ConfigurationPanel from './components/ConfigurationPanel';
import ExecutionTimeline from './components/ExecutionTimeline';
import ScreenshotPreview from './components/ScreenshotPreview';
import LogsPanel from './components/LogsPanel';
import Footer from './components/Footer';

export default function App() {
  const [url, setUrl] = useState('https://ui.shadcn.com/docs/forms/react-hook-form');
  const [title, setTitle] = useState('Login button not working');
  const [description, setDescription] = useState("I'm having an issue where clicking the login button on mobile Safari does nothing. It does not send any request or show validation errors.");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, running, completed, error
  const [logs, setLogs] = useState([]);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [stepStates, setStepStates] = useState({
    browser_opened: 'idle',
    page_loaded: 'idle',
    page_scrolled: 'idle',
    elements_detected: 'idle',
    form_filled: 'idle',
    screenshot_taken: 'idle',
  });

  const handleRunAgent = () => {
    setIsRunning(true);
    setStatus('running');
    setLogs([]);
    setScreenshotUrl(null);
    setStepStates({
      browser_opened: 'idle',
      page_loaded: 'idle',
      page_scrolled: 'idle',
      elements_detected: 'idle',
      form_filled: 'idle',
      screenshot_taken: 'idle',
    });

    const queryParams = new URLSearchParams({
      url,
      title,
      description,
    }).toString();

    // Connect to Server-Sent Events stream on backend
    const eventSource = new EventSource(`http://localhost:3001/api/run?${queryParams}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'log') {
          setLogs((prev) => [...prev, data.message]);
        } else if (data.type === 'step') {
          setStepStates((prev) => ({
            ...prev,
            [data.step]: data.status,
          }));

          // Capture screenshot location if complete
          if (data.step === 'screenshot_taken' && data.status === 'completed' && data.filename) {
            setScreenshotUrl(`http://localhost:3001/screenshots/${data.filename}`);
          }
        } else if (data.type === 'complete') {
          setIsRunning(false);
          if (data.success) {
            setStatus('completed');
            setLogs((prev) => [...prev, '✓ Browser execution completed successfully.']);
          } else {
            setStatus('error');
            setLogs((prev) => [...prev, `❌ Automation error: ${data.error}`]);
            
            // Mark remaining idle steps as failed
            setStepStates((prev) => {
              const updated = { ...prev };
              Object.keys(updated).forEach((key) => {
                if (updated[key] === 'idle' || updated[key] === 'running') {
                  updated[key] = 'failed';
                }
              });
              return updated;
            });
          }
          eventSource.close();
        }
      } catch (err) {
        console.error('Failed to parse SSE data stream:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error:', err);
      setLogs((prev) => [...prev, '❌ Disconnected from automation backend.']);
      setIsRunning(false);
      setStatus('error');
      
      // Update running/idle steps to failed
      setStepStates((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          if (updated[key] === 'idle' || updated[key] === 'running') {
            updated[key] = 'failed';
          }
        });
        return updated;
      });
      eventSource.close();
    };
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <Header status={status} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col justify-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left panel: Config and Timeline */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ConfigurationPanel
              url={url}
              setUrl={setUrl}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              onRun={handleRunAgent}
              isRunning={isRunning}
            />
            <div className="flex-1">
              <ExecutionTimeline stepStates={stepStates} />
            </div>
          </div>

          {/* Right panel: Screenshot and Terminal Logs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1">
              <ScreenshotPreview screenshotUrl={screenshotUrl} />
            </div>
            <div className="h-[280px]">
              <LogsPanel logs={logs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
