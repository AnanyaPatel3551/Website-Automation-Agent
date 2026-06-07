const log = require("../utils/logger");

async function clickOnScreen(page , x , y){

  log(`Clicking at (${x}, ${y})`);

  await page.mouse.click(x ,y);

  log("Click completed");
}

module.exports = clickOnScreen;