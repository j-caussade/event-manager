// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the location controller which contains the logic for handling location-related requests
const locationController = require("../controllers/locationController");

/**
 * Route to create a new location.
 *
 * This route handles POST requests to create a new location.
 * It uses the createLocation function from the locationController to process the request.
 */
router.post("/", locationController.createLocation);

/**
 * Route to get all locations.
 *
 * This route handles GET requests to retrieve all locations.
 * It uses the getAllLocations function from the locationController to process the request.
 */
router.get("/", locationController.getAllLocations);

/**
 * Route to get a specific location by ID.
 *
 * This route handles GET requests to retrieve a specific location by its ID.
 * It uses the getLocationById function from the locationController to process the request.
 */
router.get("/:id", locationController.getLocationById);

/**
 * Route to update an existing location.
 *
 * This route handles PUT requests to update an existing location by its ID.
 * It uses the updateLocation function from the locationController to process the request.
 */
router.put("/:id", locationController.updateLocation);

/**
 * Route to delete a location.
 *
 * This route handles DELETE requests to remove a location by its ID.
 * It uses the deleteLocation function from the locationController to process the request.
 */
router.delete("/:id", locationController.deleteLocation);

// Export the router to be used in other parts of the application
module.exports = router;
