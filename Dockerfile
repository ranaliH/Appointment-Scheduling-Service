# Use the official Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY src/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY src/ ./

# Expose the port the app will run on
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]
