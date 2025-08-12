/**
 * @fileoverview This file contains the service functions for handling database operations related to users.
 * It includes functions for creating, retrieving, updating, and deleting users.
 * Each function interacts with the database to perform the necessary operations.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new user in the database.
 *
 * This function inserts a new user into the database using the provided user data.
 * The user data should include all required fields for the users table.
 *
 * @param {Object} userData - The data of the user to be created.
 * @param {string} userData.user_first_name - The first name of the user.
 * @param {string} userData.user_last_name - The last name of the user.
 * @param {string} userData.user_email - The email of the user.
 * @param {string} userData.user_password - The password of the user (should be hashed before insertion).
 * @param {boolean} [userData.user_is_admin] - Whether the user is an admin (defaults to false if not provided).
 * @returns {Promise<number>} The ID of the newly created user.
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
 * The returned user objects include all fields from the users table.
 *
 * @returns {Promise<Array>} An array of user objects.
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
 * Retrieves a specific user by their ID from the database.
 *
 * This function fetches a single user based on the provided user ID.
 * The returned user object includes all fields from the users table.
 *
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} The user object, or undefined if no user was found.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getUserById = async (userId) => {
  try {
    // Execute the SQL query to select a user by their ID from the database
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
 * Only the fields provided in userData will be updated.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {Object} userData - The new data for the user.
 * @param {string} [userData.user_first_name] - The first name of the user.
 * @param {string} [userData.user_last_name] - The last name of the user.
 * @param {string} [userData.user_email] - The email of the user.
 * @param {string} [userData.user_password] - The password of the user (should be hashed before update).
 * @param {boolean} [userData.user_is_admin] - Whether the user is an admin.
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
 * This operation is irreversible and will permanently delete the user record.
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
