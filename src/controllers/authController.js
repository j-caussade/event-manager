/**
 * @fileoverview This file contains the controller functions for handling HTTP requests related to authentication.
 * It acts as an intermediary between the client requests and the authentication service layer,
 * processing incoming registration and login requests, calling the appropriate service methods,
 * and sending back the appropriate HTTP responses.
 */

// Import the authService module which contains the business logic for authentication operations
const authService = require("../services/authService");

/**
 * Handles a user registration request.
 *
 * This function processes a request to register a new user by calling the appropriate service method.
 * It sends a success response with the user's ID if the registration is successful, or an error message otherwise.
 * The user is automatically registered as non-admin.
 *
 * @param {Object} req - The request object containing the new user's data in the body.
 * @param {string} req.body.user_first_name - The first name of the user.
 * @param {string} req.body.user_last_name - The last name of the user.
 * @param {string} req.body.user_email - The email of the user.
 * @param {string} req.body.user_password - The password of the user (will be hashed by the service).
 * @param {Object} res - The response object used to send back the confirmation message or an error message.
 * @returns {Object} A JSON object with a success message and the user's ID, or an error message.
 */
const register = async (req, res) => {
  try {
    // Validate that all required fields are present in the request body
    if (
      !req.body.user_first_name ||
      !req.body.user_last_name ||
      !req.body.user_email ||
      !req.body.user_password
    ) {
      return res
        .status(400)
        .json({ error: "Missing required user information" });
    }
    // Call the registerUser method from authService to register a new user
    const userId = await authService.registerUser(req.body);
    // Send a success response with a confirmation message and the user's ID
    res.status(201).json({
      message: "User registered successfully",
      userId: userId,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Registration error:", error);
    // If the error is related to duplicate email, send a 409 Conflict status
    if (
      error.message.includes("Duplicate entry") ||
      error.message.includes("user_email")
    ) {
      return res.status(409).json({ error: "Email already in use" });
    }
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res
      .status(500)
      .json({ error: "Registration failed. Please try again later." });
  }
};

/**
 * Handles a user login request.
 *
 * This function authenticates a user by verifying the provided email and password,
 * and returns a JSON Web Token (JWT) if the authentication is successful.
 *
 * @param {Object} req - The request object containing the user's email and password in the body.
 * @param {string} req.body.user_email - The email of the user.
 * @param {string} req.body.user_password - The password of the user.
 * @param {Object} res - The response object used to send back the token or an error message.
 * @returns {Object} A JSON object with the authentication token, or an error message.
 */
const login = async (req, res) => {
  try {
    // Validate that email and password are provided
    if (!req.body.user_email || !req.body.user_password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Extract user_email and user_password from the request body
    const { user_email, user_password } = req.body;
    // Call the loginUser method from authService to authenticate the user
    const token = await authService.loginUser(user_email, user_password);
    // Send a success response with the JWT
    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Login error:", error);
    // Handle specific error cases
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

/**
 * Handles a user password change request.
 *
 * This function processes a request to change a user's password by verifying the current password,
 * then updating it with the new one if the verification is successful.
 *
 * @param {Object} req - The request object containing the user's ID (from JWT), current password, and new password in the body.
 * @param {number} req.user.id - The ID of the user (extracted from the JWT).
 * @param {string} req.body.currentPassword - The current password of the user.
 * @param {string} req.body.newPassword - The new password to set.
 * @param {Object} res - The response object used to send back a success message or an error message.
 * @returns {Object} A JSON object with a success message or an error message.
 */
const changePassword = async (req, res) => {
  try {
    // Validate that all required fields are present in the request body
    if (!req.body.currentPassword || !req.body.newPassword) {
      return res
        .status(400)
        .json({ error: "Current password and new password are required" });
    }
    // Extract user ID from the JWT (assuming it's attached to req.user by a previous middleware)
    const userId = req.user.id;
    // Extract current and new passwords from the request body
    const { currentPassword, newPassword } = req.body;
    // Call the changePassword method from authService to update the password
    await authService.changePassword(userId, currentPassword, newPassword);
    // Send a success response
    res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Change password error:", error);
    // Handle specific error cases
    if (error.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    if (error.message === "Current password is incorrect") {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res
      .status(500)
      .json({ error: "Failed to change password. Please try again later." });
  }
};

// Export the register and login functions
module.exports = {
  register,
  login,
  changePassword,
};
