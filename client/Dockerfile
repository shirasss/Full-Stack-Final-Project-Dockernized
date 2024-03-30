# Use an official Node runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire client folder to the working directory
COPY . .

# Set the working directory to the src folder
WORKDIR /app/src

# Expose port 3000 to the outside world
EXPOSE 3000

# ENV HTTPS=true
# Define the command to run your app
CMD ["npm", "start"]
