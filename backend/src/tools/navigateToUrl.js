const log = require("../utils/logger");

async function navigateToUrl(page , url){
  try {
     log(`Navigating to URL: ${url}`);
     await page.goto(url);
     log(`Successfully loaded: ${url}`);
  } catch(error) {
     log(`Navigation failed: ${error.message}`);
     throw new Error(
        `Failed to navigate to ${url}`
     );
  }
}

module.exports = navigateToUrl;