const openBrowser = require("../tools/openBrowser");
const navigateToUrl = require("../tools/navigateToUrl");
const scroll = require("../tools/scroll");
const detectElements = require("../tools/detectElements");
const sendKeys = require("../tools/sendKeys");
const takeScreenshot = require("../tools/takeScreenshot");

class AutomationAgent {
  async run() {

  let browser;

  try {

    console.log("Agent Started");

    const browserData =
      await openBrowser();

    browser = browserData.browser;

    const page =
      browserData.page;

    await navigateToUrl(
      page,
      "https://ui.shadcn.com/docs/forms/react-hook-form"
    );

    await scroll(page);

    const {
      titleField,
      descriptionField
    } = await detectElements(page);

    await sendKeys(
      titleField,
      "Website Automation Assignment"
    );

    await sendKeys(
      descriptionField,
      "This form was filled automatically using a Playwright-based automation agent."
    );

    await takeScreenshot(
      page,
      "filled-form"
    );

    console.log("Agent Completed");

    await page.waitForTimeout(10000);

  } catch (error) {

    console.error(
      "Agent Failed:",
      error.message
    );

  } finally {

    if (browser) {

      console.log(
        "Closing browser..."
      );

      await browser.close();
    }
  }
}
}

module.exports = AutomationAgent;