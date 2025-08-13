/**
 * @fileoverview This file defines all the routes for city-related operations.
 * It includes routes for CRUD operations on cities, with appropriate authentication
 * and authorization middleware to ensure secure access to resources.
 * Routes are protected based on the required user privileges.
 */

// Import the Express module to create router instances
const express = require("express");
// Create a new router object to handle city-related routes
const router = express.Router();
// Import the city controller which contains the logic for handling city-related requests
const cityController = require("../controllers/cityController");
// Import authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new city.
 *
 * @route POST /
 * @group Cities - Operations about cities
 * @param {Object} req.body - City data to create
 * @param {string} req.body.city_name.required - City's name
 * @param {string} [req.body.city_description] - City's description
 * @param {string} [req.body.city_country] - City's country
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Object} 201 - City creation confirmation with city ID
 * @returns {Object} 400 - Bad request (invalid data)
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 500 - Internal server error
 */
router.post(
  "/",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  cityController.createCity
);

/**
 * Route to get all cities.
 *
 * @route GET /
 * @group Cities - Operations about cities
 * @returns {Array.<Object>} 200 - Array of city objects
 * @returns {Object} 500 - Internal server error
 */
router.get("/", cityController.getAllCities);

/**
 * Route to get a specific city by ID.
 *
 * @route GET /{id}
 * @group Cities - Operations about cities
 * @param {number} id.path.required - City ID
 * @returns {Object} 200 - City object
 * @returns {Object} 404 - City not found
 * @returns {Object} 500 - Internal server error
 */
router.get("/:id", cityController.getCityById);

/**
 * Route to update an existing city.
 *
 * @route PUT /{id}
 * @group Cities - Operations about cities
 * @param {number} id.path.required - City ID
 * @param {Object} req.body - City data to update
 * @param {string} [req.body.city_name] - City's name
 * @param {string} [req.body.city_description] - City's description
 * @param {string} [req.body.city_country] - City's country
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Object} 200 - Update confirmation
 * @returns {Object} 400 - Bad request (invalid data)
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 404 - City not found
 * @returns {Object} 500 - Internal server error
 */
router.put(
  "/:id",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  cityController.updateCity
);

/**
 * Route to delete a city.
 *
 * @route DELETE /{id}
 * @group Cities - Operations about cities
 * @param {number} id.path.required - City ID
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Object} 200 - Deletion confirmation
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 404 - City not found
 * @returns {Object} 500 - Internal server error
 */
router.delete(
  "/:id",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  cityController.deleteCity
);

// Export the router to be used in the main application
module.exports = router;
