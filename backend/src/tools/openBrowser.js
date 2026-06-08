const {chromium} = require("playwright");
const log = require("../utils/logger");

async function openBrowser(){      //open browser , create tab , return both
  log("Launching Playwright Chromium browser...");
  const isHeadless = process.env.HEADLESS !== "false";
  
  const browser = await chromium.launch({   // create chrome
    headless : isHeadless,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  log("Creating new browser context and page...");
  const page = await browser.newPage(); // create tab

  return {browser , page};
}

module.exports = openBrowser;