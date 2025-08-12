// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the city controller which contains the logic for handling city-related requests
const cityController = require("../controllers/cityController");

// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new city.
 *
 * This route handles POST requests to create a new city.
 * It uses the createCity function from the cityController to process the request.
 */
router.post("/", authenticate, authorize(1), cityController.createCity);

/**
 * Route to get all cities.
 *
 * This route handles GET requests to retrieve all cities.
 * It uses the getAllCities function from the cityController to process the request.
 */
router.get("/", cityController.getAllCities);

/**
 * Route to get a specific city by ID.
 *
 * This route handles GET requests to retrieve a specific city by its ID.
 * It uses the getCityById function from the cityController to process the request.
 */
router.get("/:id", cityController.getCityById);

/**
 * Route to update an existing city.
 *
 * This route handles PUT requests to update an existing city by its ID.
 * It uses the updateCity function from the cityController to process the request.
 */
router.put("/:id", authenticate, authorize(1), cityController.updateCity);

/**
 * Route to delete an city.
 *
 * This route handles DELETE requests to remove an city by its ID.
 * It uses the deleteCity function from the cityController to process the request.
 */
router.delete("/:id", authenticate, authorize(1), cityController.deleteCity);

// Export the router to be used in other parts of the application
module.exports = router;
