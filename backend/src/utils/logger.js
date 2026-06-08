const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();

function log(message, level = "INFO") {
  const timestamp = new Date().toLocaleString();

  const logMessage =
    `[${timestamp}] [${level}] ${message}\n`;

  console.log(
    `[${level}] ${message}`
  );

  try {
    const logDir = path.join(
      __dirname,
      "../logs"
    );

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, {
        recursive: true,
      });
    }

    fs.appendFileSync(
      path.join(logDir, "agent.log"),
      logMessage
    );
  } catch (error) {
    console.error(
      "Logger failed:",
      error.message
    );
  }

  logEmitter.emit("log", logMessage);
}

log.emitter = logEmitter;

module.exports = log;