const log = require("../utils/logger");

async function doubleClick(page , x ,y){
  log(`Double clicking at (${x} , ${y})`);

  await page.mouse.dblclick(x,y);

  log("Double click completed");
}

module.exports = doubleClick;