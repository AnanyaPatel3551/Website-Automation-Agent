const { chromium } = require("playwright");

async function main() {

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto(
  "https://ui.shadcn.com/docs/forms/react-hook-form"
);

  await page.waitForTimeout(5000);


  await page.screenshot({
    path: "google-homepage.png"
  });

  await browser.close();
}

main();