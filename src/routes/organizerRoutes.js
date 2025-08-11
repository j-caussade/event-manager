// Import the Express module
const express = require("express");
// Create a new router object to handle routes
const router = express.Router();
// Import the organizer controller which contains the logic for handling organizer-related requests
const organizerController = require("../controllers/organizerController");

/**
 * Route to create a new organizer.
 *
 * This route handles POST requests to create a new organizer.
 * It uses the createOrganizer function from the organizerController to process the request.
 */
router.post("/", organizerController.createOrganizer);

/**
 * Route to get all organizers.
 *
 * This route handles GET requests to retrieve all organizers.
 * It uses the getAllOrganizers function from the organizerController to process the request.
 */
router.get("/", organizerController.getAllOrganizers);

/**
 * Route to get a specific organizer by ID.
 *
 * This route handles GET requests to retrieve a specific organizer by its ID.
 * It uses the getOrganizerById function from the organizerController to process the request.
 */
router.get("/:id", organizerController.getOrganizerById);

/**
 * Route to update an existing organizer.
 *
 * This route handles PUT requests to update an existing organizer by its ID.
 * It uses the updateOrganizer function from the organizerController to process the request.
 */
router.put("/:id", organizerController.updateOrganizer);

/**
 * Route to delete an organizer.
 *
 * This route handles DELETE requests to remove an organizer by its ID.
 * It uses the deleteOrganizer function from the organizerController to process the request.
 */
router.delete("/:id", organizerController.deleteOrganizer);

// Export the router to be used in other parts of the application
module.exports = router;
