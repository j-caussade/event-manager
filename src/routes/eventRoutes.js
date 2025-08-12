/**
 * @fileoverview This file defines the routes for handling event-related operations.
 * It includes routes for creating, retrieving, updating, and deleting events,
 * as well as routes for retrieving events with their associated locations and organizers.
 * Routes are differentiated based on authentication requirements.
 */

// Import the Express module
const express = require("express");
// Create a new router object to handle event-related routes
const router = express.Router();
// Import the event controller which contains the logic for handling event-related requests
const eventController = require("../controllers/eventController");
// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new event.
 *
 * This route handles POST requests to create a new event.
 * It requires authentication and admin privileges.
 *
 * @name post/
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/"
 * @param {callback} middleware - Middleware to authenticate and authorize the request
 * @param {callback} controller - Controller function to handle the event creation logic
 */
router.post("/", authenticate, authorize(1), eventController.createEvent);

/**
 * Route to get all events.
 *
 * This route handles GET requests to retrieve all events.
 * It requires authentication and admin privileges.
 *
 * @name get/
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/"
 * @param {callback} middleware - Middleware to authenticate and authorize the request
 * @param {callback} controller - Controller function to handle retrieving all events
 */
router.get("/", authenticate, authorize(1), eventController.getAllEvents);

/**
 * Route to get a specific event by ID.
 *
 * This route handles GET requests to retrieve a specific event by its ID.
 *
 * @name get/:id
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/:id"
 * @param {callback} controller - Controller function to handle retrieving a specific event
 */
router.get("/:id", authenticate, authorize(1), eventController.getEventById);

/**
 * Route to update an existing event.
 *
 * This route handles PUT requests to update an existing event by its ID.
 * It requires authentication and admin privileges.
 *
 * @name put/:id
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/:id"
 * @param {callback} middleware - Middleware to authenticate and authorize the request
 * @param {callback} controller - Controller function to handle the event update logic
 */
router.put("/:id", authenticate, authorize(1), eventController.updateEvent);

/**
 * Route to delete an event.
 *
 * This route handles DELETE requests to remove an event by its ID.
 * It requires authentication and admin privileges.
 *
 * @name delete/:id
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/:id"
 * @param {callback} middleware - Middleware to authenticate and authorize the request
 * @param {callback} controller - Controller function to handle the event deletion logic
 */
router.delete("/:id", authenticate, authorize(1), eventController.deleteEvent);

/**
 * Route to get all events with locations and organizers for non-authenticated users.
 *
 * This route handles GET requests to retrieve all events with their locations and organizers.
 *
 * @name get/public/with-locations-and-organizers
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/public/with-locations-and-organizers"
 * @param {callback} controller - Controller function to handle retrieving all events with locations and organizers
 */
router.get(
  "/public/with-locations-and-organizers",
  eventController.getAllEventsWithLocationsAndOrganizers
);

/**
 * Route to get a specific event by ID with locations and organizers for non-authenticated users.
 *
 * This route handles GET requests to retrieve a specific event by its ID with its locations and organizers.
 *
 * @name get/public/with-locations-and-organizers/:id
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/public/with-locations-and-organizers/:id"
 * @param {callback} controller - Controller function to handle retrieving a specific event with locations and organizers
 */
router.get(
  "/public/with-locations-and-organizers/:id",
  eventController.getAnEventByIdWithLocationsAndOrganizers
);

// Export the router to be used in other parts of the application
module.exports = router;
