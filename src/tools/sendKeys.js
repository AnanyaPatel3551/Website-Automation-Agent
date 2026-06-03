async function sendKeys(locator , text){

  console.log(`Typing : ${text}`);

  await locator.fill(text);

  console.log("Text entered successfully");
}

module.exports = sendKeys;