/**
 * @fileoverview This file is the main entry point for the Express application.
 * It configures the Express app, sets up middleware, and defines routes.
 * The server is started here, listening on a specified port and hostname.
 */

// Load environment variables from the .env file into process.env
require("dotenv").config();

// Import the Express module
const express = require("express");

// Create an instance of an Express application
const app = express();

// Import routes from the specified route files
const eventRoutes = require("./routes/eventRoutes");
const cityRoutes = require("./routes/cityRoutes");
const locationRoutes = require("./routes/locationRoutes");
const organizeRoutes = require("./routes/organizeRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const postalCodeRoutes = require("./routes/postalCodeRoutes");
const registerRoutes = require("./routes/registerRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Define port and hostname from environment variables or use default values
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "0.0.0.0";

/**
 * Define a route for GET requests to the root URL ("/").
 *
 * This route sends a simple greeting message as a response.
 *
 * @name get/
 * @function
 * @memberof module:app
 * @inner
 * @param {string} path - Express path "/"
 * @param {callback} middleware - Middleware function to handle the request
 */
app.get("/", (req, res) => {
  // Send a response with a greeting message
  res.send("Adishatz moùnde !");
});

// Use routes for requests to "/api/v1/:resource"
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/cities", cityRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/organize", organizeRoutes);
app.use("/api/v1/organizers", organizerRoutes);
app.use("/api/v1/postal-codes", postalCodeRoutes);
app.use("/api/v1/register", registerRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

// Export the Express application for potential use in testing or other modules
module.exports = app;

// Check if the script is being run directly
if (require.main === module) {
  /**
   * Start the server on the specified port and hostname.
   *
   * This block of code starts the Express server and logs a message to the
   * console indicating that the server is running.
   */
  app.listen(port, hostname, () => {
    // Log a message to the console indicating that the server is running
    console.log(`Server running at http://${hostname}:${port}`);
  });
}
