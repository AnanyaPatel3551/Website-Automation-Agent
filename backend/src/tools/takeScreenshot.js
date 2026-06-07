const path = require("path");
const fs = require("fs");
const log = require("../utils/logger");

async function takeScreenshot(page , fileName){
  const screenshotsDir = path.resolve(__dirname, "../screenshots");
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshotPath = path.join(
    screenshotsDir,
    `${fileName}.png`
  );

  log(`Taking screenshot: ${fileName}`);

  await page.screenshot({
    path: screenshotPath,
    fullPage : true,
  });

  log(`Screenshot saved at: ${screenshotPath}`);

  return `${fileName}.png`;
}

module.exports = takeScreenshot;