// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new registration in the database.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} eventId - The ID of the event.
 * @returns {number} The ID of the newly created registration.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createRegister = async (userId, eventId) => {
  try {
    // Execute the SQL query to insert a new registration into the database
    const [result] = await pool.query(
      "INSERT INTO register (user_id, event_id) VALUES (?, ?)",
      [userId, eventId]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating registration:", error);
    throw error;
  }
};

/**
 * Retrieves all registrations for a specific event.
 *
 * @param {number} eventId - The ID of the event.
 * @returns {Array} An array of registration objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getRegistrationsByEventId = async (eventId) => {
  try {
    // Execute the SQL query to select all registrations for a specific event
    const [rows] = await pool.query(
      "SELECT * FROM register WHERE event_id = ?",
      [eventId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving registrations:", error);
    throw error;
  }
};

/**
 * Retrieves all events a specific user is registered for.
 *
 * @param {number} userId - The ID of the user.
 * @returns {Array} An array of event objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getEventsByUserId = async (userId) => {
  try {
    // Execute the SQL query to select all events for a specific user
    const [rows] = await pool.query(
      "SELECT * FROM register WHERE user_id = ?",
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving events:", error);
    throw error;
  }
};

/**
 * Deletes a registration from the database.
 *
 * @param {number} userId - The ID of the user.
 * @param {number} eventId - The ID of the event.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteRegister = async (userId, eventId) => {
  try {
    // Execute the SQL query to delete a registration from the database
    await pool.query(
      "DELETE FROM register WHERE user_id = ? AND event_id = ?",
      [userId, eventId]
    );
  } catch (error) {
    console.error("Error deleting registration:", error);
    throw error;
  }
};

module.exports = {
  createRegister,
  getRegistrationsByEventId,
  getEventsByUserId,
  deleteRegister,
};
