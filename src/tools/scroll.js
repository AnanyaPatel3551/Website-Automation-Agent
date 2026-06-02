async function scroll(page){
  console.log("Scrolling down . . . . . ");

  await page.mouse.wheel(0,1000);

  console.log("Scroll completed");
}

module.exports = scroll;