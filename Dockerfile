# Use a newer official Playwright image that comes with Node.js v22+ (which satisfies Vite's engine requirements)
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

WORKDIR /usr/src/app

# Copy root lockfiles and install server-side dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy only frontend package.json to avoid Windows lockfile constraints on native bindings (rolldown/esbuild)
COPY frontend/package.json ./frontend/
RUN npm install --prefix frontend
COPY frontend/ ./frontend/
RUN npm run build --prefix frontend

# Copy backend source files
COPY backend/ ./backend/

# Expose target Express port
EXPOSE 3001

# Start unified server hosting both the Playwright API and the static React dashboard
CMD ["npm", "run", "start:server"]
