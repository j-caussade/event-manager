// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the register controller which contains the logic for handling registration-related requests
const registerController = require("../controllers/registerController");

/**
 * Route to create a new registration.
 *
 * This route handles POST requests to create a new registration.
 * It uses the createRegister function from the registerController to process the request.
 */
router.post("/", registerController.createRegister);

/**
 * Route to get all registrations for a specific event.
 *
 * This route handles GET requests to retrieve all registrations for a specific event.
 * It uses the getRegistrationsByEventId function from the registerController to process the request.
 */
router.get("/events/:eventId", registerController.getRegistrationsByEventId);

/**
 * Route to get all events a specific user is registered for.
 *
 * This route handles GET requests to retrieve all events a specific user is registered for.
 * It uses the getEventsByUserId function from the registerController to process the request.
 */
router.get("/users/:userId", registerController.getEventsByUserId);

/**
 * Route to delete a registration.
 *
 * This route handles DELETE requests to remove a registration.
 * It uses the deleteRegister function from the registerController to process the request.
 */
router.delete("/:userId/:eventId", registerController.deleteRegister);

// Export the router object so it can be used in other parts of the application
module.exports = router;
