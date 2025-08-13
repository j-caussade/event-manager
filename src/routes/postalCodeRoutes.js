/**
 * @fileoverview Routes for handling postal code-related HTTP requests.
 * Defines endpoints for creating, retrieving, updating, and deleting postal codes.
 * Uses Express Router for route management and middleware for authentication and authorization.
 */

// Import the Express module
const express = require("express");
// Create a new router object to handle postal code routes
const router = express.Router();
// Import the postalCode controller which contains the logic for handling postal code-related requests
const postalCodeController = require("../controllers/postalCodeController");
// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * POST /postal-codes
 * @route Creates a new postal code.
 * @access Private (Admin only)
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} JSON response containing the created postal code or an error message.
 * @description This route handles POST requests to create a new postal code.
 * It requires authentication and admin privileges (authorize(1)).
 * Uses the `createPostalCode` function from the postalCodeController.
 */
router.post(
  "/",
  authenticate,
  authorize(1),
  postalCodeController.createPostalCode
);

/**
 * GET /postal-codes
 * @route Retrieves all postal codes.
 * @access Public
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} JSON response containing an array of all postal codes or an error message.
 * @description This route handles GET requests to retrieve all postal codes.
 * Uses the `getAllPostalCodes` function from the postalCodeController.
 */
router.get("/", postalCodeController.getAllPostalCodes);

/**
 * GET /postal-codes/:id
 * @route Retrieves a specific postal code by ID.
 * @access Public
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the postal code to retrieve.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} JSON response containing the requested postal code or an error message.
 * @description This route handles GET requests to retrieve a specific postal code by its ID.
 * Uses the `getPostalCodeById` function from the postalCodeController.
 */
router.get("/:id", postalCodeController.getPostalCodeById);

/**
 * PUT /postal-codes/:id
 * @route Updates an existing postal code.
 * @access Private (Admin only)
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the postal code to update.
 * @param {Object} req.body - The updated postal code data.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} JSON response containing the updated postal code or an error message.
 * @description This route handles PUT requests to update an existing postal code by its ID.
 * It requires authentication and admin privileges (authorize(1)).
 * Uses the `updatePostalCode` function from the postalCodeController.
 */
router.put(
  "/:id",
  authenticate,
  authorize(1),
  postalCodeController.updatePostalCode
);

/**
 * DELETE /postal-codes/:id
 * @route Deletes a postal code.
 * @access Private (Admin only)
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - The ID of the postal code to delete.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} JSON response confirming deletion or an error message.
 * @description This route handles DELETE requests to remove a postal code by its ID.
 * It requires authentication and admin privileges (authorize(1)).
 * Uses the `deletePostalCode` function from the postalCodeController.
 */
router.delete(
  "/:id",
  authenticate,
  authorize(1),
  postalCodeController.deletePostalCode
);

/**
 * Exports the router to be used in the main application routes.
 * @module routes/postalCodeRoutes
 */
module.exports = router;
