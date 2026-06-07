const log = require("../utils/logger");

async function scroll(page){
  log("Scrolling down . . . . . ");

  await page.mouse.wheel(0,1000);

log("Scroll completed");
}

module.exports = scroll;