async function detectElements(page){
  const titleField = page.locator("#form-rhf-demo-title");

  const descriptionField = page.locator("#form-rhf-demo-description");

  return {
    titleField,
    descriptionField,
  };
}

module.exports = detectElements;