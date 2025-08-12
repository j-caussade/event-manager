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
 * It uses the `createEvent` function from the eventController to process the request.
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
 * It uses the `getAllEvents` function from the eventController to process the request.
 *
 * @name get/
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/"
 * @param {callback} controller - Controller function to handle retrieving all events
 */
router.get("/", eventController.getAllEvents);

/**
 * Route to get a specific event by ID.
 *
 * This route handles GET requests to retrieve a specific event by its ID.
 * It uses the `getEventById` function from the eventController to process the request.
 *
 * @name get/:id
 * @function
 * @memberof module:routers/eventRouter
 * @inner
 * @param {string} path - Express path "/:id"
 * @param {callback} controller - Controller function to handle retrieving a specific event
 */
router.get("/:id", eventController.getEventById);

/**
 * Route to update an existing event.
 *
 * This route handles PUT requests to update an existing event by its ID.
 * It requires authentication and admin privileges.
 * It uses the `updateEvent` function from the eventController to process the request.
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
 * It uses the `deleteEvent` function from the eventController to process the request.
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

// Export the router to be used in other parts of the application
module.exports = router;
