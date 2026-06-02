async function navigateToUrl(page , url){
  console.log(`Navigating to : ${url}`);

  await page.goto(url);

  console.log("Page loaded successfully");
}

module.exports = navigateToUrl;