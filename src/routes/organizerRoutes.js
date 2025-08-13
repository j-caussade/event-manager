/**
 * @fileoverview Routes for organizer-related operations.
 * Defines RESTful endpoints for creating, retrieving, updating, and deleting organizers.
 * Uses Express Router for route handling and integrates authentication/authorization middleware.
 */

// Import the Express module to create and manage routes
const express = require("express");
// Create a new router object to define organizer-specific routes
const router = express.Router();
// Import the organizer controller, which contains the business logic for organizer operations
const organizerController = require("../controllers/organizerController");
// Import authentication and authorization middleware to secure routes
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * POST /organizers
 * @route Creates a new organizer.
 * @access Private (requires authentication and admin privileges)
 * @param {Object} req.body - Organizer data to be created.
 * @returns {Object} 201 - The created organizer object.
 * @throws {401} Unauthorized - If the user is not authenticated.
 * @throws {403} Forbidden - If the user lacks admin privileges.
 */
router.post(
  "/",
  authenticate,
  authorize(1), // Requires admin role (assuming 1 represents admin)
  organizerController.createOrganizer
);

/**
 * GET /organizers
 * @route Retrieves all organizers.
 * @access Public (no authentication required)
 * @returns {Array<Object>} 200 - An array of organizer objects.
 */
router.get("/", organizerController.getAllOrganizers);

/**
 * GET /organizers/:id
 * @route Retrieves a specific organizer by ID.
 * @access Public (no authentication required)
 * @param {string} req.params.id - The ID of the organizer to retrieve.
 * @returns {Object} 200 - The organizer object matching the provided ID.
 * @throws {404} NotFound - If no organizer matches the provided ID.
 */
router.get("/:id", organizerController.getOrganizerById);

/**
 * PUT /organizers/:id
 * @route Updates an existing organizer by ID.
 * @access Private (requires authentication and admin privileges)
 * @param {string} req.params.id - The ID of the organizer to update.
 * @param {Object} req.body - Updated organizer data.
 * @returns {Object} 200 - The updated organizer object.
 * @throws {401} Unauthorized - If the user is not authenticated.
 * @throws {403} Forbidden - If the user lacks admin privileges.
 * @throws {404} NotFound - If no organizer matches the provided ID.
 */
router.put(
  "/:id",
  authenticate,
  authorize(1), // Requires admin role
  organizerController.updateOrganizer
);

/**
 * DELETE /organizers/:id
 * @route Deletes an organizer by ID.
 * @access Private (requires authentication and admin privileges)
 * @param {string} req.params.id - The ID of the organizer to delete.
 * @returns {Object} 200 - A success message or the deleted organizer object.
 * @throws {401} Unauthorized - If the user is not authenticated.
 * @throws {403} Forbidden - If the user lacks admin privileges.
 * @throws {404} NotFound - If no organizer matches the provided ID.
 */
router.delete(
  "/:id",
  authenticate,
  authorize(1), // Requires admin role
  organizerController.deleteOrganizer
);

/**
 * Exports the router to be mounted in the main application.
 * @module routes/organizerRoutes
 */
module.exports = router;
