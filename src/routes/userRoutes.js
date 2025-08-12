/**
 * @fileoverview This file defines all the routes for user-related operations.
 * It includes routes for CRUD operations on users, with appropriate authentication
 * and authorization middleware to ensure secure access to resources.
 * Routes are protected based on the required user privileges.
 */

// Import the Express module to create router instances
const express = require("express");
// Create a new router object to handle user-related routes
const router = express.Router();
// Import the user controller which contains the logic for handling user-related requests
const userController = require("../controllers/userController");
// Import authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new user.
 *
 * @route POST /
 * @group Users - Operations about users
 * @param {Object} req.body - User data to create
 * @param {string} req.body.user_first_name.required - User's first name
 * @param {string} req.body.user_last_name.required - User's last name
 * @param {string} req.body.user_email.required - User's email address
 * @param {string} req.body.user_password.required - User's password
 * @param {boolean} [req.body.user_is_admin] - Whether the user is an admin (defaults to false)
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Object} 201 - User creation confirmation with user ID
 * @returns {Object} 400 - Bad request (invalid data)
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 500 - Internal server error
 */
router.post(
  "/",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  userController.createUser
);

/**
 * Route to get all users.
 *
 * @route GET /
 * @group Users - Operations about users
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Array.<Object>} 200 - Array of user objects
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 500 - Internal server error
 */
router.get(
  "/",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  userController.getAllUsers
);

/**
 * Route to get a specific user by ID.
 *
 * @route GET /{id}
 * @group Users - Operations about users
 * @param {number} id.path.required - User ID
 * @security JWT - Requires a valid JWT token
 * @returns {Object} 200 - User object
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
router.get(
  "/:id",
  authenticate, // Requires valid authentication
  userController.getUserById
);

/**
 * Route to update an existing user.
 *
 * @route PUT /{id}
 * @group Users - Operations about users
 * @param {number} id.path.required - User ID
 * @param {Object} req.body - User data to update
 * @param {string} [req.body.user_first_name] - User's first name
 * @param {string} [req.body.user_last_name] - User's last name
 * @param {string} [req.body.user_email] - User's email address
 * @param {string} [req.body.user_password] - User's password (will be hashed)
 * @security JWT - Requires a valid JWT token (user can only update their own profile unless admin)
 * @returns {Object} 200 - Update confirmation
 * @returns {Object} 400 - Bad request (invalid data)
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user trying to update another user's profile without admin privileges)
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
router.put(
  "/:id",
  authenticate, // Requires valid authentication
  userController.updateUser
);

/**
 * Route to delete a user.
 *
 * @route DELETE /{id}
 * @group Users - Operations about users
 * @param {number} id.path.required - User ID
 * @security JWT - Requires a valid JWT token with admin privileges (role 1)
 * @returns {Object} 200 - Deletion confirmation
 * @returns {Object} 401 - Unauthorized (missing or invalid token)
 * @returns {Object} 403 - Forbidden (user doesn't have admin privileges)
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal server error
 */
router.delete(
  "/:id",
  authenticate,
  authorize(1), // Requires admin privileges (role 1)
  userController.deleteUser
);

// Export the router to be used in the main application
module.exports = router;
