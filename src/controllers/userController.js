// Import the userService module which contains the business logic for user operations.
const userService = require("../services/userService");

/**
 * Creates a new user.
 *
 * This function handles the creation of a new user by calling the corresponding service method.
 * It expects the user data to be provided in the request body.
 *
 * @param {Object} req - The request object containing user data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created user, or an error message.
 */
const createUser = async (req, res) => {
  try {
    // Call the createUser method from userService with the request body.
    const user = await userService.createUser(req.body);
    // Send a success response with status code 201 (Created) and the created user.
    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all users.
 *
 * This function fetches all users by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of users or an error message.
 * @returns {Object} A JSON object with the list of users or an error message.
 */
const getAllUsers = async (req, res) => {
  try {
    // Call the getAllUsers method from userService to retrieve all users.
    const users = await userService.getAllUsers();
    // Send a success response with the list of users.
    res.json(users);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a user by its ID.
 *
 * This function fetches a specific user by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the user ID in the parameters.
 * @param {Object} res - The response object used to send back the user or an error message.
 * @returns {Object} A JSON object with the retrieved user or an error message.
 */
const getUserById = async (req, res) => {
  try {
    // Call the getUserById method from userService with the user ID from request parameters.
    const user = await userService.getUserById(req.params.id);
    // Send a success response with the retrieved user.
    res.json(user);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing user.
 *
 * This function updates a user by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the user ID in the parameters and updated user data in the body.
 * @param {Object} res - The response object used to send back the updated user or an error message.
 * @returns {Object} A JSON object with the updated user or an error message.
 */
const updateUser = async (req, res) => {
  try {
    // Call the updateUser method from userService with the user ID from request parameters and the request body.
    const user = await userService.updateUser(req.params.id, req.body);
    // Send a success response with the updated user.
    res.json(user);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a user by its ID.
 *
 * This function deletes a specific user by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the user ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteUser = async (req, res) => {
  try {
    // Call the deleteUser method from userService with the user ID from request parameters.
    await userService.deleteUser(req.params.id);
    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `User ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
