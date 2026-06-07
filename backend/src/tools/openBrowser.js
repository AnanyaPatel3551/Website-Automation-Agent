const {chromium} = require("playwright");
const log = require("../utils/logger");

async function openBrowser(){      //open browser , create tab , return both
  log("Launching Playwright Chromium browser...");
  const browser = await chromium.launch({   // create chrome
    headless : false,
  });

  log("Creating new browser context and page...");
  const page = await browser.newPage(); // create tab

  return {browser , page};
}

module.exports = openBrowser;