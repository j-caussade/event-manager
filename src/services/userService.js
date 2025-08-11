// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new user in the database.
 *
 * This function inserts a new user into the database using the provided user data.
 *
 * @param {Object} userData - The data of the user to be created.
 * @returns {number} The ID of the newly created user.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createUser = async (userData) => {
  try {
    // Execute the SQL query to insert a new user into the database
    const [result] = await pool.query("INSERT INTO users SET ?", userData);
    // Return the ID of the newly created user
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Retrieves all users from the database.
 *
 * This function fetches all users stored in the database.
 *
 * @returns {Array} An array of user objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllUsers = async () => {
  try {
    // Execute the SQL query to select all users from the database
    const [rows] = await pool.query("SELECT * FROM users");
    // Return the array of users
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving users:", error);
    throw error;
  }
};

/**
 * Retrieves a specific user by its ID from the database.
 *
 * This function fetches a single user based on the provided user ID.
 *
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Object} The user object.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getUserById = async (userId) => {
  try {
    // Execute the SQL query to select a user by its ID from the database
    const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);
    // Return the first user found (should be the only one if user_id is unique)
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving user:", error);
    throw error;
  }
};

/**
 * Updates an existing user in the database.
 *
 * This function updates a user's data based on the provided user ID and new user data.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {Object} userData - The new data for the user.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateUser = async (userId, userData) => {
  try {
    // Execute the SQL query to update a user's data in the database
    await pool.query("UPDATE users SET ? WHERE user_id = ?", [
      userData,
      userId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating user:", error);
    throw error;
  }
};

/**
 * Deletes a user from the database.
 *
 * This function removes a user from the database based on the provided user ID.
 *
 * @param {number} userId - The ID of the user to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteUser = async (userId) => {
  try {
    // Execute the SQL query to delete a user from the database
    await pool.query("DELETE FROM users WHERE user_id = ?", [userId]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
