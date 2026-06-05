async function clickOnScreen(page , x , y){

  console.log(`Clicking at (${x}, ${y})`);

  await page.mouse.click(x ,y);

  console.log("Click completed");
}

module.exports = clickOnScreen;