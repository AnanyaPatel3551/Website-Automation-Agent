const log = require("./utils/logger");

const AutomationAgent =
  require("./agent/AutomationAgent");

async function main() {

  

  const agent =
    new AutomationAgent();


  await agent.run();
}

main();