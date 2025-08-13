/**
 * @fileoverview Routes for handling registration-related HTTP requests.
 * Defines endpoints for creating, retrieving, and deleting event registrations.
 * Uses Express Router for route management and middleware for authentication/authorization.
 */

// Import the Express module to create and manage routes
const express = require("express");
// Create a new router object to define and handle registration-related routes
const router = express.Router();
// Import the register controller which contains the business logic for registration operations
const registerController = require("../controllers/registerController");
// Import authentication and authorization middleware to protect routes
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * POST /register/
 * Route to create a new registration for an event.
 *
 * @name post/register
 * @function
 * @memberof module:routes/registerRoutes
 * @inner
 * @param {string} path - Express path "/"
 * @param {Function} authenticate - Middleware to authenticate the user
 * @param {Function} registerController.createRegister - Controller function to handle registration creation
 * @description Creates a new registration record in the database.
 * Requires authentication to ensure only logged-in users can register for events.
 */
router.post("/", authenticate, registerController.createRegister);

/**
 * GET /register/events/:eventId
 * Route to retrieve all registrations for a specific event.
 *
 * @name get/register/events/:eventId
 * @function
 * @memberof module:routes/registerRoutes
 * @inner
 * @param {string} path - Express path "/events/:eventId"
 * @param {Function} registerController.getRegistrationsByEventId - Controller function to fetch registrations by event ID
 * @description Retrieves all user registrations for the specified event.
 * No authentication required; useful for public event pages.
 */
router.get("/events/:eventId", registerController.getRegistrationsByEventId);

/**
 * GET /register/users/:userId
 * Route to retrieve all events a specific user is registered for.
 *
 * @name get/register/users/:userId
 * @function
 * @memberof module:routes/registerRoutes
 * @inner
 * @param {string} path - Express path "/users/:userId"
 * @param {Function} authenticate - Middleware to authenticate the user
 * @param {Function} registerController.getEventsByUserId - Controller function to fetch events by user ID
 * @description Retrieves all events the specified user is registered for.
 * Requires authentication to protect user privacy.
 */
router.get(
  "/users/:userId",
  authenticate,
  registerController.getEventsByUserId
);

/**
 * DELETE /register/:userId/:eventId
 * Route to delete a specific registration.
 *
 * @name delete/register/:userId/:eventId
 * @function
 * @memberof module:routes/registerRoutes
 * @inner
 * @param {string} path - Express path "/:userId/:eventId"
 * @param {Function} authenticate - Middleware to authenticate the user
 * @param {Function} registerController.deleteRegister - Controller function to handle registration deletion
 * @description Deletes a registration record for a specific user and event.
 * Requires authentication to ensure only the user or admin can delete registrations.
 */
router.delete(
  "/:userId/:eventId",
  authenticate,
  registerController.deleteRegister
);

/**
 * Exports the router object to be used in the main application file.
 * @module routes/registerRoutes
 * @exports router
 */
module.exports = router;
