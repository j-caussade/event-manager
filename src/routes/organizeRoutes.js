// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the organize controller which contains the logic for handling organize-related requests
const organizeController = require("../controllers/organizeController");

// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new organize entry.
 *
 * This route handles POST requests to create a new entry in the organize table.
 * It uses the createOrganize function from the organizeController to process the request.
 */
router.post("/", authenticate, authorize(1), organizeController.createOrganize);

/**
 * Route to get all organizers for a specific event.
 *
 * This route handles GET requests to retrieve all organizers for a specific event.
 * It uses the getOrganizersByEventId function from the organizeController to process the request.
 */
router.get("/events/:eventId", organizeController.getOrganizersByEventId);

/**
 * Route to get all events for a specific organizer.
 *
 * This route handles GET requests to retrieve all events for a specific organizer.
 * It uses the getEventsByOrganizerId function from the organizeController to process the request.
 */
router.get(
  "/organizers/:organizerId",
  organizeController.getEventsByOrganizerId
);

/**
 * Route to delete an organize entry.
 *
 * This route handles DELETE requests to remove an entry from the organize table.
 * It uses the deleteOrganize function from the organizeController to process the request.
 */
router.delete(
  "/:eventId/:organizerId",
  authenticate,
  authorize(1),
  organizeController.deleteOrganize
);

// Export the router to be used in other parts of the application
module.exports = router;
