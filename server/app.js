// Load environment variables from .env file
require("dotenv").config();

// Import the Express module
const express = require("express");

// Create an instance of an Express application
const app = express();

// Define the port and hostname from environment variables or use defaults
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";

// Define a route for GET requests to the root URL
app.get("/", (req, res) => {
  // Send a response with a message
  res.send("Adishatz moùnde !");
});

// Export the Express application for use in testing
module.exports = app;

// Check if the script is being run directly
if (require.main === module) {
  // Start the server on the specified port and hostname
  app.listen(port, hostname, () => {
    // Log a message to the console indicating that the server is running
    console.log(`App running at http://${hostname}:${port}`);
  });
}
