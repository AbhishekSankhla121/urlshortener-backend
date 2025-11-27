# Use Node 25 Alpine
FROM node:25.2.1-alpine3.22

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

# Switch to non-root user
USER backend

# Expose backend port
EXPOSE 5000

# Set environment variable to enable polling for file changes
ENV CHOKIDAR_USEPOLLING=true

# Use nodemon for live reload
CMD ["npx", "nodemon", "index.js", "--legacy-watch"]