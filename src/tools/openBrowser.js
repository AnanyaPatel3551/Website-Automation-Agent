const {chromium} = require("playwright");

async function openBrowser(){      //open browser , create tab , return both
  const browser = await chromium.launch({   // create chrome
    headless : false,
  });

  const page = await browser.newPage(); // create tab

  return {browser , page};
}

module.exports = openBrowser;