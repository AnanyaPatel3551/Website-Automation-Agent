# Use the official Playwright environment which includes pre-installed browsers and OS dependencies
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /usr/src/app

# Copy root lockfiles and install server-side dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy frontend source files, install packages, and build the static distribution
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend
COPY frontend/ ./frontend/
RUN npm run build --prefix frontend

# Copy backend source files
COPY backend/ ./backend/

# Expose target Express port
EXPOSE 3001

# Start unified server hosting both the Playwright API and the static React dashboard
CMD ["npm", "run", "start:server"]
