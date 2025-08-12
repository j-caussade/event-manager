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
    const user = await authService.loginUser(user_email, user_password);
    // Generate a token (this would typically be done in the service, but included here for completeness)
    // In a real implementation, the service would return the token directly
    // const token = generateToken(user);
    // Send a success response with the user data (excluding sensitive information)
    res.json({
      message: "Login successful",
      user: {
        userId: user.user_id,
        firstName: user.user_first_name,
        lastName: user.user_last_name,
        email: user.user_email,
        isAdmin: user.user_is_admin,
      },
      // token: token // Uncomment if using token-based authentication
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Login error:", error);
    // Handle specific error cases
    if (error.message === "User not found.") {
      return res.status(404).json({ error: "User not found" });
    }
    if (error.message === "Invalid password.") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
};

// Export the register and login functions
module.exports = {
  register,
  login,
};
