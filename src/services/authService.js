/**
 * @fileoverview This file contains the service functions for handling authentication operations.
 * It includes functions for registering and logging in users, as well as generating JSON Web Tokens.
 * Each function interacts with the database and external libraries to perform the necessary operations.
 */

// Import the dotenv module for environment variable configuration
require("dotenv").config();
// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");
// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
// Import jsonwebtoken for token generation
const jwt = require("jsonwebtoken");

/**
 * Registers a new user in the database.
 *
 * This function takes a user's data, hashes the password using bcrypt,
 * and inserts the new user into the database. The user is automatically set as non-admin.
 *
 * @param {Object} userData - The user data to be registered.
 * @param {string} userData.user_first_name - The first name of the user.
 * @param {string} userData.user_last_name - The last name of the user.
 * @param {string} userData.user_email - The email of the user.
 * @param {string} userData.user_password - The password of the user.
 * @returns {Promise<number>} The ID of the newly created user.
 * @throws {Error} Throws an error if the database operation fails.
 */
const registerUser = async (userData) => {
  try {
    // Hash the user's password with a salt round of 10
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      userData.user_password,
      saltRounds
    );
    // Insert the new user into the database, forcing user_is_admin to false
    const [result] = await pool.query("INSERT INTO users SET ?", {
      user_first_name: userData.user_first_name,
      user_last_name: userData.user_last_name,
      user_email: userData.user_email,
      user_password: hashedPassword,
      user_is_admin: false, // Force the user to be non-admin
    });
    // Return the ID of the newly created user
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Logs in a user and generates a JSON Web Token.
 *
 * This function checks if the user exists and if the password is valid,
 * then generates a JSON Web Token with the user's ID and role.
 *
 * @param {string} user_email - The email of the user.
 * @param {string} user_password - The password of the user.
 * @returns {Promise<string>} The JSON Web Token for the authenticated user.
 * @throws {Error} Throws an error if the user is not found or if the password is invalid.
 */
const loginUser = async (user_email, user_password) => {
  try {
    // Retrieve the user from the database by email
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );
    // If no user is found, throw an error
    if (rows.length === 0) {
      throw new Error("Invalid credentials");
    }
    // Check if the provided password matches the stored hashed password
    const user = rows[0];
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // Generate and return a JSON Web Token
    const token = jwt.sign(
      { id: user.user_id, role: user.user_is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error logging in user:", error);
    throw error;
  }
};

/**
 * Changes the password of a user after verifying the current password.
 *
 * This function checks if the current password provided matches the stored password,
 * then updates the password with the new one if the check is successful.
 *
 * @param {number} userId - The ID of the user.
 * @param {string} currentPassword - The current password of the user.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<void>} Resolves if the password was successfully changed.
 * @throws {Error} Throws an error if the current password is invalid or if the database operation fails.
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    // Retrieve the user from the database by ID
    const [rows] = await pool.query(
      "SELECT user_password FROM users WHERE user_id = ?",
      [userId]
    );
    // If no user is found, throw an error
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    // Check if the provided current password matches the stored hashed password
    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.user_password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }
    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password in the database
    await pool.query("UPDATE users SET user_password = ? WHERE user_id = ?", [
      hashedNewPassword,
      userId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error changing password:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
