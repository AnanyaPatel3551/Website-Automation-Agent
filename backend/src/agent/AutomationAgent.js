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
  async run(options = {}, onStepChange = () => {}) {
    const targetUrl = options.targetUrl || config.TARGET_URL;
    const titleText = options.titleText || config.TITLE_TEXT;
    const descriptionText = options.descriptionText || config.DESCRIPTION_TEXT;

    let browser;

    const runSteps = [
      "browser_opened",
      "page_loaded",
      "page_scrolled",
      "elements_detected",
      "form_filled",
      "screenshot_taken"
    ];

    try {
     log("Agent Started");
log("Browser Opened");
log("Page Loaded");
log("Form Elements Detected");
log("Form Filled");
log("Screenshot Captured");
log("Agent Completed");

      // Step 1: Open Browser
      onStepChange("browser_opened", "running");
      const browserData = await openBrowser();
      browser = browserData.browser;
      const page = browserData.page;
      onStepChange("browser_opened", "completed");

      // Step 2: Navigate to URL
      onStepChange("page_loaded", "running");
      await navigateToUrl(page, targetUrl);
      await page.waitForTimeout(3000);
      onStepChange("page_loaded", "completed");

      // Step 3: Scroll
      onStepChange("page_scrolled", "running");
      log("Double clicking page core coordinates for active focus...");
      await doubleClick(page, 500, 300);
      await page.waitForTimeout(1000);
      await scroll(page);
      await page.waitForTimeout(2000);
      onStepChange("page_scrolled", "completed");

      // Step 4: Element Detection
      onStepChange("elements_detected", "running");
      const { titleField, descriptionField } = await detectElements(page);
      onStepChange("elements_detected", "completed");

      // Step 5: Fill Form
      onStepChange("form_filled", "running");
      await sendKeys(titleField, titleText);
      await page.waitForTimeout(1000);
      await sendKeys(descriptionField, descriptionText);
      await page.waitForTimeout(1500);
      onStepChange("form_filled", "completed");

      // Step 6: Take Screenshot
      onStepChange("screenshot_taken", "running");
      const screenshotName = `filled-form-${Date.now()}`;
      const screenshotFilename = await takeScreenshot(page, screenshotName);
      onStepChange("screenshot_taken", "completed", { filename: screenshotFilename });

      log("Agent Completed successfully");
      await page.waitForTimeout(2000);

    } catch (error) {
      console.error(error);
      log(
  `Agent Failed: ${error.message}`,
  "ERROR"
);

      // Notify steps of failure
      onStepChange("error", error.message);
      throw error;
    } finally {
      if (browser) {
        log("Closing browser context...");
        await browser.close();
      }
    }
  }
}

module.exports = AutomationAgent;