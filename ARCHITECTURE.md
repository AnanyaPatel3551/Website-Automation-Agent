# Website Automation Agent — Architecture

## Overview

The Website Automation Agent is built using a **modular architecture** where each browser action is implemented as an independent tool. The agent orchestrates these tools to perform automated browser interactions and form-filling operations.

---

## High-Level Workflow

```
┌─────────────────────┐
│        User         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Automation Agent   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   openBrowser()     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  navigateToUrl()    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      scroll()       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  detectElements()   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     sendKeys()      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  takeScreenshot()   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   closeBrowser()    │
└─────────────────────┘
```

---

## Components

### `AutomationAgent`

Responsible for coordinating all tools and managing workflow execution.

**Responsibilities:**
- Execute browser automation workflow
- Handle exceptions
- Log execution status
- Ensure browser cleanup

---

### `openBrowser()`

| | |
|---|---|
| **Purpose** | Launches a Playwright browser instance and creates a new browser page |
| **Input** | None |
| **Output** | `Browser` object and `Page` object |

---

### `navigateToUrl()`

| | |
|---|---|
| **Purpose** | Navigates the browser to the target URL |
| **Input** | `Page`, `URL` |
| **Output** | Loaded webpage |

---

### `scroll()`

| | |
|---|---|
| **Purpose** | Scrolls the page to reveal hidden content |
| **Input** | `Page` |
| **Output** | Updated page view |

---

### `detectElements()`

| | |
|---|---|
| **Purpose** | Identifies the required form elements |
| **Input** | `Page` |
| **Output** | `titleField`, `descriptionField` |

**Currently detects:**
- Bug Title field
- Description field

---

### `sendKeys()`

| | |
|---|---|
| **Purpose** | Enters text into form elements |
| **Input** | `Locator`, `Text` |
| **Output** | Filled form field |

---

### `clickOnScreen()`

| | |
|---|---|
| **Purpose** | Performs mouse clicks at specified coordinates |
| **Input** | `x` coordinate, `y` coordinate |
| **Output** | Mouse click action |

---

### `doubleClick()`

| | |
|---|---|
| **Purpose** | Performs double-click actions at specified coordinates |
| **Input** | `x` coordinate, `y` coordinate |
| **Output** | Double-click action |

---

### `takeScreenshot()`

| | |
|---|---|
| **Purpose** | Captures the current browser state and stores it locally |
| **Input** | `Page`, `File name` |
| **Output** | PNG screenshot |

---

### `logger()`

Stores execution logs throughout the automation run.

**Responsibilities:**
- Record execution steps
- Record errors
- Maintain audit trail

---

## Error Handling Strategy

The agent uses a layered error handling approach:

- `try/catch` blocks around all tool calls
- `finally` blocks to guarantee cleanup
- Execution logging at every step
- Safe browser shutdown regardless of failure

> This ensures browser instances are properly closed even when errors occur.

---

## Current Limitations

- Built specifically for the assignment webpage
- Uses predefined element identification logic
- Does not yet use AI for element detection

---

## Future Enhancements

| Enhancement | Description |
|---|---|
| OpenAI Agents SDK Integration | Native agent SDK support |
| Gemini Integration | Alternative AI backbone |
| Vision-Based Element Detection | AI-powered element identification |
| Dynamic Task Planning | Runtime task decomposition |
| Multi-Step Browser Automation | Complex, chained action sequences |
| Universal Website Support | Works on any site, not just the current target |
| Frontend Dashboard | Visual control and monitoring UI |
| Browser Use Style Autonomous Agent | Fully autonomous browsing agent |

---

## Design Principles

1. **Modular Architecture** — each tool is self-contained and independently testable
2. **Separation of Concerns** — agent logic is decoupled from browser tooling
3. **Reusable Browser Tools** — tools can be composed into any workflow
4. **Extensible Agent Design** — easy to add new tools without touching existing ones
5. **Easy Future Integration with AI Models** — designed for drop-in AI enhancement