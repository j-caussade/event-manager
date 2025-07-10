# Use Node.js version 22 with Alpine
# Alpine is chosen for its lightweight nature, 
# improved security due to minimalistic design, 
# and better performance
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port on which the application listens
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]
