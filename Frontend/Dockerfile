# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies (caches if package files haven’t changed)
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using an NGINX server
FROM nginx:alpine

# Copy the build files from the previous stage to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
