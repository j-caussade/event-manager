// Import the authService module which contains the business logic for authentication operations
const authService = require("../services/authService");

/**
 * Handles a user registration request.
 *
 * This function processes a request to register a new user by calling the appropriate service method.
 * It sends a success response with the user's ID if the registration is successful, or an error message otherwise.
 *
 * @param {Object} req - The request object containing the new user's data in the body.
 * @param {string} req.body.user_first_name - The first name of the user.
 * @param {string} req.body.user_last_name - The last name of the user.
 * @param {string} req.body.user_email - The email of the user.
 * @param {string} req.body.user_password - The password of the user.
 * @param {boolean} req.body.user_is_admin - Whether the user is an admin.
 * @param {Object} res - The response object used to send back the confirmation message or an error message.
 */
const register = async (req, res) => {
  try {
    // Call the registerUser method from authService to register a new user
    const userId = await authService.registerUser(req.body);

    // Send a success response with a confirmation message and the user's ID
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
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
 */
const login = async (req, res) => {
  try {
    // Extract user_email and user_password from the request body
    const { user_email, user_password } = req.body;

    // Call the loginUser method from authService to authenticate the user
    const token = await authService.loginUser({ user_email, user_password });

    // Send a success response with the token
    res.json({ token });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error)
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
