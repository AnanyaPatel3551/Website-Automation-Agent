const openBrowser = require("./tools/openBrowser");
const navigateToUrl = require("./tools/navigateToUrl");
const scroll = require("./tools/scroll");
const takeScreenshot = require("./tools/takeScreenshot");
const sendKeys = require("./tools/sendKeys");
const detectElements = require("./tools/detectElements");


async function main() {

   const { browser, page } = await openBrowser();

  await navigateToUrl(
    page,
    "https://ui.shadcn.com/docs/forms/react-hook-form"
  );

  await scroll(page);

  const { titleField, descriptionField } =
    await detectElements(page);

  console.log("Elements detected successfully");

  await sendKeys(
    titleField,
    "Website Automation Assignment"
  );

  await sendKeys(
    descriptionField,
    "This form was filled automatically using a Playwright-based website automation agent built in JavaScript."
  );

  await takeScreenshot(
    page,
    "filled-form"
  );

  await page.waitForTimeout(10000);
}

main();