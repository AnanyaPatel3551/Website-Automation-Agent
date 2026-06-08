# Website Automation Agent Dashboard

A responsive, premium web automation console and developer dashboard built with React and Vite. It controls a Playwright-based browser automation agent, allowing you to trigger sessions, input form payloads, monitor step-by-step pipeline executions, and analyze viewport screenshots and terminal logs.

The visual layout is inspired by minimalist engineering tools like **Linear**, **Vercel**, and **Notion** using clean typography, thin borders, light gray cards, and zero neon gradients.

---

## 🚀 Key Features

* **Vercel-Inspired Visual Interface**: High-usability dashboard layout on a white canvas with thin zinc borders, clean Inter and JetBrains Mono typography, and precise alignment.
* **Agent Status Card**: A dashboard control panel displaying elapsed session duration (active 100ms timer), pipeline progress ratios, current sub-step actions, and the destination hostname.
* **Hero URL Input & Collapsible Payload**: Prominent URL browser bar, paired with a collapsible accordion containing automated form payload parameters (Bug Title, Description) to keep the layout clutter-free.
* **Browser Viewport Mockup**: Renders browser screenshots inside a mock web browser frame featuring macOS action buttons, a secure URL address bar, and download/open-tab helpers.
* **Terminal Console**: Monospace terminal block containing scroll-locked, level-categorized logs (`[INF]`, `[OK]`, `[WRN]`, `[ERR]`), line numbering, and a clipboard copy tool.
* **Vertical Connected Pipeline**: Vertical check-path pipeline showing active step animations, completed checkmarks, and failures.
* **Containerized Deployment Ready**: Multi-stage production `Dockerfile` leveraging matching Playwright runtime libraries and Node.js v24.

---

## 📂 Project Structure

```text
website-automation-agent/
├── Dockerfile                  # Production container configuration
├── package.json                # Root concurrently development configuration
├── backend/
│   ├── src/
│   │   ├── agent/
│   │   │   └── AutomationAgent.js   # Main agent flow manager
│   │   ├── config/
│   │   │   └── config.js            # Default fallback parameters
│   │   ├── tools/
│   │   │   ├── openBrowser.js       # Browser launcher (headless container ready)
│   │   │   ├── navigateToUrl.js     # Browser navigator
│   │   │   ├── scroll.js            # Viewport scroll
│   │   │   ├── detectElements.js    # Form input field identifier
│   │   │   ├── sendKeys.js          # Form inputs typing tool
│   │   │   ├── doubleClick.js       # Coordinate clicker
│   │   │   └── takeScreenshot.js    # Viewport screenshot capture (OOM safe)
│   │   ├── utils/
│   │   │   └── logger.js            # Logging emitter
│   │   └── index.js                 # Express 5 backend server & static web server
├── frontend/
│   ├── package.json            # React/Vite development package list
│   ├── index.html               # Index template
│   ├── src/
│   │   ├── main.jsx             # React entry mount
│   │   ├── App.jsx              # Main grid layout and state coordinator
│   │   ├── index.css            # Custom fonts & core scrollbar styles
│   │   ├── components/
│   │   │   ├── Header.jsx              # Breadcrumb header
│   │   │   ├── ConfigurationPanel.jsx  # Hero inputs & collapsible options
│   │   │   ├── StatusCard.jsx          # Live metrics, timers, & hostnames
│   │   │   ├── ScreenshotPreview.jsx   # Browser viewport mockup frame
│   │   │   ├── LogsPanel.jsx           # Monospace console terminal
│   │   │   ├── ExecutionTimeline.jsx   # Vertical connected pipeline nodes
│   │   │   └── Footer.jsx              # Bottom console layout info
```

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/AnanyaPatel3551/Website-Automation-Agent.git
cd Website-Automation-Agent
```

### 2. Install dependencies
Install root, backend, and frontend dependencies:
```bash
npm install
npm install --prefix frontend
```

### 3. Run development servers
Start the Express API server (port 3001) and Vite client server (port 5174) concurrently:
```bash
npm run dev
```

Open **[http://localhost:5174/](http://localhost:5174/)** in your browser.

---

## ☁️ Production Deployment (Docker + Render)

The project is fully optimized for **single-container deployment** (the Express backend hosts the built static React client directly in production).

### Deploying to Render via Docker (Recommended)
1. Log in to [Render](https://dashboard.render.com/) and click **New +** $\rightarrow$ **Web Service**.
2. Select your `Website-Automation-Agent` GitHub repository.
3. Change the **Runtime** setting from Node to **Docker**.
4. Clear the build command and start command inputs (Render will read them from the root `Dockerfile` instead).
5. In **Advanced**, add the environment variable `PORT = 3001` (Render exposes this port automatically).
6. Click **Deploy**.

Render will build the container using `playwright:v1.60.0-jammy` (Node 24) and launch the application on a public URL.

---

## 🛠️ Performance & OOM Optimizations

* **Vite Node requirements**: Docker base image updated to Playwright v1.60.0, upgrading the environment to Node v24 to satisfy bundler dependencies.
* **NPM Optional Locks**: Windows-specific lock configurations are bypassed in Docker by running `npm install` exclusively on the container's frontend `package.json`, ensuring native Linux compilation bindings for `rolldown` and `esbuild` are downloaded.
* **Browser Sandbox Bypass**: Launched Chromium with `["--no-sandbox", "--disable-setuid-sandbox"]` arguments to allow headless execution under Linux root environments.
* **OOM Safe Screenshots**: Disabled full-page screenshots on tall pages (e.g. Shadcn's 16,000px height page) in favor of active viewport capturing. This reduces memory allocation from ~120MB+ to ~7MB, preventing Render's free 512MB RAM instance from crashing due to Out-Of-Memory (OOM) errors.

---

## 👥 Author

**Ananya Patel**  
Assignment 04 — Website Automation Agent
