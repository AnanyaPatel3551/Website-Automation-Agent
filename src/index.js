const openBrowser = require("./tools/openBrowser");
const navigateToUrl = require("./tools/navigateToUrl");
const scroll = require("./tools/scroll");

async function main() {
  const { browser, page } = await openBrowser();

  await navigateToUrl(
    page,
    "https://ui.shadcn.com/docs/forms/react-hook-form"
  );

  await scroll(page);

  await page.waitForTimeout(5000);

  await browser.close();
}

main();