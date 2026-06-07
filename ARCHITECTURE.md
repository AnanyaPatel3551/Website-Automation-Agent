<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Automation Agent — Architecture</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0f14;
    --bg2: #13161e;
    --bg3: #1a1e28;
    --border: #252a38;
    --border2: #2e3548;
    --text: #e2e6f0;
    --muted: #7a8299;
    --accent: #4f8ef7;
    --accent2: #38bdf8;
    --teal: #2dd4bf;
    --purple: #a78bfa;
    --green: #34d399;
    --amber: #fbbf24;
    --tag-bg: #1e2535;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
  }

  .page {
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 40px;
  }

  /* Header */
  .header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 36px;
    margin-bottom: 56px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    background: rgba(79,142,247,0.1);
    border: 1px solid rgba(79,142,247,0.25);
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    letter-spacing: 0.05em;
  }

  h1 {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 14px;
  }

  .subtitle {
    font-size: 15px;
    color: var(--muted);
    max-width: 560px;
    line-height: 1.65;
  }

  /* Sections */
  section {
    margin-bottom: 64px;
  }

  h2 {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h2::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* Flow diagram */
  .flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .flow-node {
    width: 280px;
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    padding: 14px 20px;
    text-align: center;
    position: relative;
    transition: border-color 0.2s, background 0.2s;
  }

  .flow-node:hover {
    border-color: var(--accent);
    background: var(--bg3);
  }

  .flow-node.user {
    border-color: var(--border2);
    background: var(--bg3);
  }

  .flow-node.agent {
    border-color: var(--purple);
    background: rgba(167,139,250,0.06);
    width: 320px;
  }

  .flow-node.tool {
    border-color: var(--border2);
    width: 280px;
  }

  .flow-node.tool:hover {
    border-color: var(--teal);
  }

  .flow-node.close {
    border-color: var(--border2);
    opacity: 0.7;
  }

  .node-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 3px;
  }

  .node-sub {
    font-size: 11px;
    color: var(--muted);
  }

  .flow-node.agent .node-label { color: var(--purple); }
  .flow-node.tool .node-label { color: var(--teal); }
  .flow-node.user .node-label { color: var(--accent2); }

  .arrow {
    width: 1px;
    height: 28px;
    background: var(--border2);
    position: relative;
    display: flex;
    justify-content: center;
  }

  .arrow::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid var(--border2);
  }

  /* Components grid */
  .components-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .component-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 20px 22px;
    transition: border-color 0.2s;
  }

  .component-card:hover { border-color: var(--border2); }

  .component-card.wide {
    grid-column: 1 / -1;
    border-color: var(--purple);
    background: rgba(167,139,250,0.04);
  }

  .card-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: var(--teal);
    margin-bottom: 10px;
  }

  .component-card.wide .card-name { color: var(--purple); }

  .card-row {
    display: flex;
    gap: 8px;
    margin-bottom: 6px;
    font-size: 13px;
    align-items: baseline;
  }

  .card-row:last-child { margin-bottom: 0; }

  .row-key {
    color: var(--muted);
    min-width: 52px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-top: 2px;
  }

  .row-val {
    color: var(--text);
    font-size: 13px;
    line-height: 1.5;
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    background: var(--tag-bg);
    color: var(--accent2);
    padding: 1px 5px;
    border-radius: 3px;
  }

  .responsibilities {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 2px;
  }

  .resp-item {
    font-size: 12.5px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .resp-item::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--purple);
    flex-shrink: 0;
  }

  /* Error handling */
  .error-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .error-pill {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    text-align: center;
  }

  .error-pill-icon {
    font-size: 20px;
    margin-bottom: 6px;
  }

  .error-pill-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .error-pill-desc {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.4;
  }

  /* Limitations */
  .limit-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .limit-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--muted);
  }

  .limit-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--amber);
    flex-shrink: 0;
  }

  /* Future enhancements */
  .future-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .future-item {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: border-color 0.2s;
  }

  .future-item:hover { border-color: var(--green); }

  .future-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--green);
    flex-shrink: 0;
    margin-top: 6px;
  }

  .future-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 2px;
  }

  .future-desc {
    font-size: 12px;
    color: var(--muted);
  }

  /* Principles */
  .principles-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    counter-reset: principle;
  }

  .principle-item {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 18px;
    counter-increment: principle;
  }

  .principle-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    background: rgba(79,142,247,0.1);
    border: 1px solid rgba(79,142,247,0.2);
    width: 26px;
    height: 26px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .principle-text strong {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    display: block;
    margin-bottom: 1px;
  }

  .principle-text span {
    font-size: 12px;
    color: var(--muted);
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  section {
    animation: fadeUp 0.5s ease both;
  }

  section:nth-child(1) { animation-delay: 0s; }
  section:nth-child(2) { animation-delay: 0.07s; }
  section:nth-child(3) { animation-delay: 0.14s; }
  section:nth-child(4) { animation-delay: 0.21s; }
  section:nth-child(5) { animation-delay: 0.28s; }
  section:nth-child(6) { animation-delay: 0.35s; }
  section:nth-child(7) { animation-delay: 0.42s; }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="badge">⬡ automation-agent · v1.0</div>
    <h1>Website Automation Agent<br>Architecture</h1>
    <p class="subtitle">A modular browser automation system where each action is an independent tool, orchestrated by a central agent to perform automated interactions and form-filling operations.</p>
  </div>

  <!-- Workflow -->
  <section>
    <h2>High-Level Workflow</h2>
    <div class="flow">

      <div class="flow-node user">
        <div class="node-label">User</div>
        <div class="node-sub">Initiates the agent</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node agent">
        <div class="node-label">AutomationAgent</div>
        <div class="node-sub">Orchestrates all tools &amp; workflow</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">openBrowser()</div>
        <div class="node-sub">Launch Playwright instance + page</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">navigateToUrl()</div>
        <div class="node-sub">Load the target URL</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">scroll()</div>
        <div class="node-sub">Reveal hidden page content</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">detectElements()</div>
        <div class="node-sub">Identify form fields</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">sendKeys()</div>
        <div class="node-sub">Enter text into fields</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node tool">
        <div class="node-label">takeScreenshot()</div>
        <div class="node-sub">Capture page state as PNG</div>
      </div>
      <div class="arrow"></div>

      <div class="flow-node close">
        <div class="node-label">closeBrowser()</div>
        <div class="node-sub">Cleanup via finally block</div>
      </div>

    </div>
  </section>

  <!-- Components -->
  <section>
    <h2>Components</h2>
    <div class="components-grid">

      <div class="component-card wide">
        <div class="card-name">AutomationAgent</div>
        <div class="responsibilities">
          <div class="resp-item">Execute browser automation workflow</div>
          <div class="resp-item">Handle exceptions gracefully</div>
          <div class="resp-item">Log execution status at every step</div>
          <div class="resp-item">Ensure browser cleanup on exit</div>
        </div>
      </div>

      <div class="component-card">
        <div class="card-name">openBrowser()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Launch Playwright browser + page</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val">None</span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val"><code>Browser</code> &amp; <code>Page</code> objects</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">navigateToUrl()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Navigate to target URL</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>Page</code>, <code>URL</code></span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">Loaded webpage</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">scroll()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Reveal hidden page content</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>Page</code></span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">Updated page view</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">detectElements()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Identify form fields</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>Page</code></span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val"><code>titleField</code>, <code>descriptionField</code></span></div>
      </div>

      <div class="component-card">
        <div class="card-name">sendKeys()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Enter text into fields</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>Locator</code>, <code>Text</code></span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">Filled form field</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">clickOnScreen()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Perform mouse click</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>x</code>, <code>y</code> coordinates</span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">Mouse click action</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">doubleClick()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Perform double-click</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>x</code>, <code>y</code> coordinates</span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">Double-click action</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">takeScreenshot()</div>
        <div class="card-row"><span class="row-key">Purpose</span><span class="row-val">Capture browser state</span></div>
        <div class="card-row"><span class="row-key">Input</span><span class="row-val"><code>Page</code>, <code>filename</code></span></div>
        <div class="card-row"><span class="row-key">Output</span><span class="row-val">PNG screenshot on disk</span></div>
      </div>

      <div class="component-card">
        <div class="card-name">logger()</div>
        <div class="responsibilities">
          <div class="resp-item">Record execution steps</div>
          <div class="resp-item">Record errors with context</div>
          <div class="resp-item">Maintain full audit trail</div>
        </div>
      </div>

    </div>
  </section>

  <!-- Error Handling -->
  <section>
    <h2>Error Handling Strategy</h2>
    <div class="error-grid">
      <div class="error-pill">
        <div class="error-pill-label">try / catch</div>
        <div class="error-pill-desc">Wraps every tool call</div>
      </div>
      <div class="error-pill">
        <div class="error-pill-label">finally</div>
        <div class="error-pill-desc">Guaranteed cleanup block</div>
      </div>
      <div class="error-pill">
        <div class="error-pill-label">logger()</div>
        <div class="error-pill-desc">Logs every step &amp; error</div>
      </div>
      <div class="error-pill">
        <div class="error-pill-label">shutdown</div>
        <div class="error-pill-desc">Safe browser teardown</div>
      </div>
    </div>
  </section>

  <!-- Limitations -->
  <section>
    <h2>Current Limitations</h2>
    <div class="limit-list">
      <div class="limit-item"><div class="limit-dot"></div>Built specifically for the assignment webpage</div>
      <div class="limit-item"><div class="limit-dot"></div>Uses predefined element identification logic</div>
      <div class="limit-item"><div class="limit-dot"></div>Does not yet use AI for element detection</div>
    </div>
  </section>

  <!-- Future Enhancements -->
  <section>
    <h2>Future Enhancements</h2>
    <div class="future-grid">
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">OpenAI Agents SDK</div><div class="future-desc">Native agent SDK integration</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Gemini Integration</div><div class="future-desc">Alternative AI backbone</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Vision-Based Detection</div><div class="future-desc">AI-powered element identification</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Dynamic Task Planning</div><div class="future-desc">Runtime task decomposition</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Multi-Step Automation</div><div class="future-desc">Complex, chained sequences</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Universal Website Support</div><div class="future-desc">Works on any site, not just the target</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Frontend Dashboard</div><div class="future-desc">Visual control and monitoring UI</div></div></div>
      <div class="future-item"><div class="future-dot"></div><div><div class="future-name">Autonomous Agent Mode</div><div class="future-desc">Browser Use style self-direction</div></div></div>
    </div>
  </section>

  <!-- Design Principles -->
  <section>
    <h2>Design Principles</h2>
    <div class="principles-list">
      <div class="principle-item">
        <div class="principle-num">1</div>
        <div class="principle-text"><strong>Modular Architecture</strong><span>Each tool is self-contained and independently testable</span></div>
      </div>
      <div class="principle-item">
        <div class="principle-num">2</div>
        <div class="principle-text"><strong>Separation of Concerns</strong><span>Agent logic is fully decoupled from browser tooling</span></div>
      </div>
      <div class="principle-item">
        <div class="principle-num">3</div>
        <div class="principle-text"><strong>Reusable Browser Tools</strong><span>Tools can be composed into any automation workflow</span></div>
      </div>
      <div class="principle-item">
        <div class="principle-num">4</div>
        <div class="principle-text"><strong>Extensible Agent Design</strong><span>Add new tools without touching existing ones</span></div>
      </div>
      <div class="principle-item">
        <div class="principle-num">5</div>
        <div class="principle-text"><strong>AI-Ready Integration</strong><span>Designed for drop-in AI model enhancement</span></div>
      </div>
    </div>
  </section>

</div>
</body>
</html>