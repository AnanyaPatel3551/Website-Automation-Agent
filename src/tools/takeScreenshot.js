const path = require("path");

async function takeScreenshot(page , fileName){
  const screenshotPath = path.join(
    "screenshots",
    `${fileName}.png`
  );

  console.log(`Taking screenshot : ${fileName}`);

  await page.screenshot({
    path: screenshotPath,
    fullPage : true,
  });

  console.log(`Screenshot saved at : ${screenshotPath}`);

  return screenshotPath;;
}

module.exports = takeScreenshot;