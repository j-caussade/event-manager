// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the event controller which contains the logic for handling event-related requests
const eventController = require("../controllers/eventController");

/**
 * Route to create a new event.
 *
 * This route handles POST requests to create a new event.
 * It uses the createEvent function from the eventController to process the request.
 */
router.post("/create", eventController.createEvent);

/**
 * Route to get all events.
 *
 * This route handles GET requests to retrieve all events.
 * It uses the getAllEvents function from the eventController to process the request.
 */
router.get("/", eventController.getAllEvents);

/**
 * Route to get a specific event by ID.
 *
 * This route handles GET requests to retrieve a specific event by its ID.
 * It uses the getEventById function from the eventController to process the request.
 */
router.get("/read/:id", eventController.getEventById);

/**
 * Route to update an existing event.
 *
 * This route handles PUT requests to update an existing event by its ID.
 * It uses the updateEvent function from the eventController to process the request.
 */
router.put("/update/:id", eventController.updateEvent);

/**
 * Route to delete an event.
 *
 * This route handles DELETE requests to remove an event by its ID.
 * It uses the deleteEvent function from the eventController to process the request.
 */
router.delete("/delete/:id", eventController.deleteEvent);

// Export the router to be used in other parts of the application
module.exports = router;
