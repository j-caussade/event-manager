/**
 * @fileoverview This file defines all the routes for authentication-related operations.
 * It includes routes for user registration, login, and protected routes that require
 * authentication and authorization. Each route is configured with the appropriate
 * controller functions to handle the requests.
 */

// Import the Express module to create router instances
const express = require("express");
// Create a new router object to handle authentication-related routes
const router = express.Router();
// Import the auth controller which contains the logic for handling authentication-related requests
const authController = require("../controllers/authController");
// Import authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to handle user registration.
 *
 * @route POST /register
 * @group Authentication - Operations related to user authentication
 * @param {Object} req.body - User registration data
 * @param {string} req.body.user_first_name.required - User's first name
 * @param {string} req.body.user_last_name.required - User's last name
 * @param {string} req.body.user_email.required - User's email address
 * @param {string} req.body.user_password.required - User's password
 * @returns {Object} 201 - Registration confirmation with user ID
 * @returns {Object} 400 - Bad request (missing required fields)
 * @returns {Object} 409 - Conflict (email already in use)
 * @returns {Object} 500 - Internal server error
 *
 * @description This route handles new user registration. All newly registered users
 * are automatically set as non-admin by default. No authentication is required
 * to access this route.
 */
router.post("/register", authController.register);

/**
 * Route to handle user login.
 *
 * @route POST /login
 * @group Authentication - Operations related to user authentication
 * @param {Object} req.body - User login credentials
 * @param {string} req.body.user_email.required - User's email address
 * @param {string} req.body.user_password.required - User's password
 * @returns {Object} 200 - Login successful with JWT token
 * @returns {Object} 400 - Bad request (missing credentials)
 * @returns {Object} 401 - Unauthorized (invalid credentials)
 * @returns {Object} 500 - Internal server error
 *
 * @description This route authenticates users by verifying their email and password.
 * On successful authentication, it returns a JWT token.
 */
router.post("/login", authController.login);

/**
 * Route to handle user password change.
 *
 * @route PUT /change-password
 * @group Authentication - Operations related to user authentication
 * @param {Object} req.body - Password change data
 * @param {string} req.body.currentPassword.required - User's current password
 * @param {string} req.body.newPassword.required - User's new password
 * @returns {Object} 200 - Password changed successfully
 * @returns {Object} 400 - Bad request (missing required fields)
 * @returns {Object} 401 - Unauthorized (current password is incorrect)
 * @returns {Object} 404 - Not found (user not found)
 * @returns {Object} 500 - Internal server error
 *
 * @description This route allows a logged-in user to change their password.
 * The user must provide their current password and the new password.
 * The route is protected and requires a valid JWT token.
 */
router.put(
  "/change-password",
  authenticate, // Middleware pour vérifier le JWT et attacher req.user
  authController.changePassword
);

// Export the router to be used in the main application
module.exports = router;
