# Build stage
FROM node:25.2.1-alpine3.22 AS builder

#set working directory
WORKDIR /app

#Copy package files
COPY package*.json ./

#install dependencies 
RUN npm ci

# copy source code 
COPY . .

#production stage 
FROM node:25.2.1-alpine3.22 AS production

RUN apk add --no-cache git

#create app directory
WORKDIR /app

#create non-root-user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

#Copy built application builder stage
COPY --from=builder --chown=nextjs:nodejs /app /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]