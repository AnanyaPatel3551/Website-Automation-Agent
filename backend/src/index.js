const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const log = require('./utils/logger');
const AutomationAgent = require('./agent/AutomationAgent');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static screenshots folder
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}
app.use('/screenshots', express.static(screenshotsDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// SSE endpoint to run agent and stream logs + step updates
app.get('/api/run', async (req, res) => {
  const { url, title, description } = req.query;

  // Set headers for Server-Sent Events (SSE)
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Keep-alive heartbeat interval to avoid timeouts
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  // Subscribe to logs from our logger emitter
  const logListener = (msg) => {
    res.write(`data: ${JSON.stringify({ type: 'log', message: msg })}\n\n`);
  };
  log.emitter.on('log', logListener);

  try {
    const agent = new AutomationAgent();
    
    await agent.run(
      {
        targetUrl: url,
        titleText: title,
        descriptionText: description,
      },
      (stepId, status, details = {}) => {
        res.write(
          `data: ${JSON.stringify({
            type: 'step',
            step: stepId,
            status,
            ...details,
          })}\n\n`
        );
      }
    );

    res.write(`data: ${JSON.stringify({ type: 'complete', success: true })}\n\n`);
  } catch (error) {
    res.write(
      `data: ${JSON.stringify({
        type: 'complete',
        success: false,
        error: error.message,
      })}\n\n`
    );
  } finally {
    clearInterval(heartbeat);
    log.emitter.off('log', logListener);
    res.end();
  }
});

// Serve frontend build files in production (placed after API routes)
const distDir = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  log(`Express backend server started on port ${PORT}`);
});