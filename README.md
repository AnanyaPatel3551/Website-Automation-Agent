# Website Automation Agent

A Playwright-based Website Automation Agent built in JavaScript that can autonomously navigate web pages, identify form elements, fill forms, take screenshots, and perform browser interactions.

This project was developed as part of Assignment 04: Website Automation Agent.

---

## Project Objective

Build an intelligent browser automation agent capable of:

* Opening a browser
* Navigating to a website
* Scrolling through web pages
* Detecting form elements
* Filling forms automatically
* Performing mouse interactions
* Capturing screenshots
* Logging execution steps

---

## Target Task

The agent successfully performs the following workflow:

1. Opens a browser instance.
2. Navigates to:

https://ui.shadcn.com/docs/forms/react-hook-form

3. Scrolls to locate the target form.
4. Detects:

   * Bug Title field
   * Description field
5. Automatically enters text into both fields.
6. Captures a screenshot of the completed form.
7. Saves logs for execution tracking.
8. Closes the browser safely.

---

## Technologies Used

* JavaScript (Node.js)
* Playwright
* File System (fs)
* Path Module

---

## Project Structure

website-automation-agent/

├── src/

│   ├── agent/

│   │   └── AutomationAgent.js

│   ├── config/

│   │   └── config.js

│   ├── tools/

│   │   ├── openBrowser.js

│   │   ├── navigateToUrl.js

│   │   ├── scroll.js

│   │   ├── detectElements.js

│   │   ├── sendKeys.js

│   │   ├── clickOnScreen.js

│   │   ├── doubleClick.js

│   │   └── takeScreenshot.js

│   ├── utils/

│   │   └── logger.js

│   └── index.js

├── screenshots/

├── logs/

├── README.md

└── package.json

---

## Features

### open_browser

Launches a Playwright browser instance and creates a new page.

### navigate_to_url

Navigates to the specified URL.

### scroll

Scrolls the page to reveal hidden content.

### detect_elements

Detects target input and textarea fields.

### send_keys

Types text into detected form elements.

### click_on_screen

Performs mouse click actions using screen coordinates.

### double_click

Performs double-click actions using screen coordinates.

### take_screenshot

Captures and stores screenshots of browser activity.

### logging

Records agent actions and execution status.

---

## Installation

Clone the repository:

git clone <repository-url>

Move into the project folder:

cd website-automation-agent

Install dependencies:

npm install

Install Playwright:

npx playwright install

---

## Running the Project

Start the automation agent:

node src/index.js

---

## Example Output

Agent Started

Page Loaded Successfully

Form Elements Detected

Text Entered Successfully

Screenshot Saved

Agent Completed

Closing Browser

---

## Screenshots

Generated screenshots are stored in:

screenshots/

Execution logs are stored in:

logs/

---

## Error Handling

The project includes:

* Try/Catch blocks
* Browser cleanup using finally
* Error logging
* Safe browser shutdown

---

## Future Improvements

* OpenAI Integration
* Gemini Integration
* AI-based Element Detection
* Dynamic Task Execution
* Frontend Dashboard
* Multi-Page Automation
* Autonomous Browser Agent
* Browser Use Style Workflows

---

## Author

Ananya Patel

Website Automation Agent – Assignment 04
