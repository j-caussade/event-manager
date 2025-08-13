/**
 * @fileoverview Routes for handling organize-related API endpoints.
 * Defines routes for creating, retrieving, and deleting organize entries,
 * which represent the relationship between events and organizers.
 * Uses Express Router for modular route handling.
 */

// Import the Express module
const express = require("express");
// Create a new router object to handle routes
const router = express.Router();
// Import the organize controller which contains the logic for handling organize-related requests
const organizeController = require("../controllers/organizeController");
// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * @route POST /
 * @description Creates a new organize entry linking an event to an organizer.
 * @access Private (requires authentication and admin privileges)
 * @param {Function} authenticate - Middleware to verify user authentication.
 * @param {Function} authorize - Middleware to verify admin privileges (role = 1).
 * @param {Function} organizeController.createOrganize - Controller function to handle the creation of a new organize entry.
 */
router.post("/", authenticate, authorize(1), organizeController.createOrganize);

/**
 * @route GET /events/:eventId
 * @description Retrieves all organizers associated with a specific event.
 * @access Public (no authentication required)
 * @param {string} eventId - The ID of the event for which to retrieve organizers.
 * @param {Function} organizeController.getOrganizersByEventId - Controller function to handle the retrieval of organizers by event ID.
 */
router.get("/events/:eventId", organizeController.getOrganizersByEventId);

/**
 * @route GET /organizers/:organizerId
 * @description Retrieves all events associated with a specific organizer.
 * @access Public (no authentication required)
 * @param {string} organizerId - The ID of the organizer for which to retrieve events.
 * @param {Function} organizeController.getEventsByOrganizerId - Controller function to handle the retrieval of events by organizer ID.
 */
router.get(
  "/organizers/:organizerId",
  organizeController.getEventsByOrganizerId
);

/**
 * @route DELETE /:eventId/:organizerId
 * @description Deletes an organize entry, removing the link between an event and an organizer.
 * @access Private (requires authentication and admin privileges)
 * @param {string} eventId - The ID of the event.
 * @param {string} organizerId - The ID of the organizer.
 * @param {Function} authenticate - Middleware to verify user authentication.
 * @param {Function} authorize - Middleware to verify admin privileges (role = 1).
 * @param {Function} organizeController.deleteOrganize - Controller function to handle the deletion of an organize entry.
 */
router.delete(
  "/:eventId/:organizerId",
  authenticate,
  authorize(1),
  organizeController.deleteOrganize
);

/**
 * Exports the router to be used in the main application routes.
 * @module routes/organizeRoutes
 */
module.exports = router;
