const fs = require('fs');
const path = require('path');

function log(message){

  const timestamp = new Date().toLocaleString();

  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(message);

  fs.appendFileSync(
    path.join(
      __dirname ,
      "../logs/agent.log"
    ),
    logMessage
  );
}

module.exports  = log;