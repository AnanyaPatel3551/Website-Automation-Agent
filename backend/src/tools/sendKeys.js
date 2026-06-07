const log = require("../utils/logger");

async function sendKeys(locator , text){

  log(`Typing: ${text}`);

  await locator.fill(text);

  log("Text entered successfully");
}

module.exports = sendKeys;