const openBrowser = require("../tools/openBrowser");
const navigateToUrl = require("../tools/navigateToUrl");
const scroll = require("../tools/scroll");
const detectElements = require("../tools/detectElements");
const sendKeys = require("../tools/sendKeys");
const takeScreenshot = require("../tools/takeScreenshot");
const config = require("../config/config");
const log = require("../utils/logger");
const doubleClick = require("../tools/doubleClick");

class AutomationAgent {
  async run() {

  let browser;

  try {

    log("Agent Started");

    const browserData =
      await openBrowser();

    browser = browserData.browser;

    const page =
      browserData.page;

    await navigateToUrl(
      page,
      config.TARGET_URL
    )
await page.waitForTimeout(3000);

await doubleClick(page, 500, 500);

await page.waitForTimeout(3000);

    await scroll(page);

    const {
      titleField,
      descriptionField
    } = await detectElements(page);

    await sendKeys(
      titleField,
      config.TITLE_TEXT
    );

    await sendKeys(
      descriptionField,
      config.DESCRIPTION_TEXT
    );

    await takeScreenshot(
      page,
      "filled-form"
    );

    log("Agent Completed");

    await page.waitForTimeout(10000);

  }catch (error) {

  console.error(error);

  log(
    `Agent Failed: ${error.message}`
  );

}finally {

    if (browser) {

     log(
        "Closing browser..."
      );

      await browser.close();
    }
  }
}
}

module.exports = AutomationAgent;