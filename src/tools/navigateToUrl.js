async function navigateToUrl(page , url){

  try {

     await page.goto(url);

  } catch(error) {

     throw new Error(
       `Failed to navigate to ${url}`
     );

  }
}

module.exports = navigateToUrl;