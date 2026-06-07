const log = require("../utils/logger");

async function detectElements(page) {
  const inputs = page.locator("input");
  const textareas = page.locator("textarea");

  let titleField = null;
  let descriptionField = null;

  const inputCount = await inputs.count();

  log(`Found ${inputCount} input fields`);

  for (let i = 0; i < inputCount; i++) {
    const input = inputs.nth(i);

    const placeholder =
      await input.getAttribute("placeholder");

    log(
      `Input ${i + 1}: ${placeholder || "No Placeholder"}`
    );

    if (
      placeholder &&
      placeholder.includes("Login button not working")
    ) {
      titleField = input;

      log(
        "Bug Title field identified successfully"
      );

      break;
    }
  }

  const textareaCount = await textareas.count();

  log(`Found ${textareaCount} textarea fields`);

  for (let i = 0; i < textareaCount; i++) {
    const textarea = textareas.nth(i);

    const placeholder =
      await textarea.getAttribute("placeholder");

    log(
      `Textarea ${i + 1}: ${placeholder || "No Placeholder"}`
    );

    if (
      placeholder &&
      placeholder.includes("I'm having an issue")
    ) {
      descriptionField = textarea;

      log(
        "Description field identified successfully"
      );

      break;
    }
  }

  if (!titleField || !descriptionField) {
    throw new Error(
      "Required form elements could not be identified."
    );
  }

  return {
    titleField,
    descriptionField,
  };
}

module.exports = detectElements;