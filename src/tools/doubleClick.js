async function doubleClick(page , x ,y){
  console.log(`Double clicking at (${x} , ${y})`);

  await page.mouse.dbclick(x,y);

  console.log("Double click completed");
}

module.exports = doubleClick;