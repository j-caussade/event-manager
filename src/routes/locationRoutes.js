/**
 * @fileoverview Routes for handling location-related API endpoints.
 * Defines CRUD routes for locations, including creation, retrieval, update, and deletion.
 * Uses Express Router for modular route handling and middleware for authentication/authorization.
 */

// Import the Express module
const express = require("express");
// Create a new router object to handle routes
const router = express.Router();
// Import the location controller which contains the logic for handling location-related requests
const locationController = require("../controllers/locationController");
// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * @route POST /
 * @description Creates a new location in the database.
 * @access Private (requires authentication and admin privileges)
 * @param {Function} authenticate - Middleware to verify user authentication.
 * @param {Function} authorize - Middleware to verify admin privileges (role = 1).
 * @param {Function} locationController.createLocation - Controller function to handle the creation of a new location.
 */
router.post("/", authenticate, authorize(1), locationController.createLocation);

/**
 * @route GET /
 * @description Retrieves all locations from the database.
 * @access Public (no authentication required)
 * @param {Function} locationController.getAllLocations - Controller function to handle the retrieval of all locations.
 */
router.get("/", locationController.getAllLocations);

/**
 * @route GET /:id
 * @description Retrieves a specific location by its ID.
 * @access Public (no authentication required)
 * @param {string} id - The ID of the location to retrieve.
 * @param {Function} locationController.getLocationById - Controller function to handle the retrieval of a location by ID.
 */
router.get("/:id", locationController.getLocationById);

/**
 * @route PUT /:id
 * @description Updates an existing location by its ID.
 * @access Private (requires authentication and admin privileges)
 * @param {string} id - The ID of the location to update.
 * @param {Function} authenticate - Middleware to verify user authentication.
 * @param {Function} authorize - Middleware to verify admin privileges (role = 1).
 * @param {Function} locationController.updateLocation - Controller function to handle the update of a location.
 */
router.put(
  "/:id",
  authenticate,
  authorize(1),
  locationController.updateLocation
);

/**
 * @route DELETE /:id
 * @description Deletes a location by its ID.
 * @access Private (requires authentication and admin privileges)
 * @param {string} id - The ID of the location to delete.
 * @param {Function} authenticate - Middleware to verify user authentication.
 * @param {Function} authorize - Middleware to verify admin privileges (role = 1).
 * @param {Function} locationController.deleteLocation - Controller function to handle the deletion of a location.
 */
router.delete(
  "/:id",
  authenticate,
  authorize(1),
  locationController.deleteLocation
);

/**
 * Exports the router to be used in the main application routes.
 * @module routes/locationRoutes
 */
module.exports = router;
