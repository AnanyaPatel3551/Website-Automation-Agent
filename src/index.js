const AutomationAgent =
  require("./agent/AutomationAgent");

async function main() {

  const agent =
    new AutomationAgent();

  await agent.run();
}

main();