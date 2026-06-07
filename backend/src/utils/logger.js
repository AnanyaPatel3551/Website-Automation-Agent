const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class LogEmitter extends EventEmitter {}
const logEmitter = new LogEmitter();

function log(message){
  const timestamp = new Date().toLocaleTimeString();
  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(message);

  try {
    const logDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logDir, "agent.log"),
      logMessage
    );
  } catch (error) {
    console.error("Logger failed to write to file:", error.message);
  }

  logEmitter.emit('log', message);
}

log.emitter = logEmitter;

module.exports = log;