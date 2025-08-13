/**
 * @fileoverview Service functions for handling database operations related to event registrations.
 * Provides CRUD operations for user-event registrations, including creation, retrieval, and deletion.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new registration record in the database.
 * Links a user to an event by inserting a new row into the 'register' table.
 *
 * @async
 * @function createRegister
 * @param {number} userId - The unique identifier of the user registering for the event.
 * @param {number} eventId - The unique identifier of the event being registered for.
 * @returns {Promise<number>} The ID of the newly created registration record.
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
 * Returns an array of registration objects associated with the given event ID.
 *
 * @async
 * @function getRegistrationsByEventId
 * @param {number} eventId - The unique identifier of the event.
 * @returns {Promise<Array<Object>>} An array of registration objects.
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
 * Returns an array of registration objects associated with the given user ID.
 *
 * @async
 * @function getEventsByUserId
 * @param {number} userId - The unique identifier of the user.
 * @returns {Promise<Array<Object>>} An array of registration objects.
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
 * Deletes a registration record from the database.
 * Removes the link between a user and an event based on their respective IDs.
 *
 * @async
 * @function deleteRegister
 * @param {number} userId - The unique identifier of the user.
 * @param {number} eventId - The unique identifier of the event.
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

/**
 * Exports all service functions for use in other modules.
 * @module services/registerService
 * @property {Function} createRegister - Creates a new registration record.
 * @property {Function} getRegistrationsByEventId - Retrieves registrations by event ID.
 * @property {Function} getEventsByUserId - Retrieves events by user ID.
 * @property {Function} deleteRegister - Deletes a registration record.
 */
module.exports = {
  createRegister,
  getRegistrationsByEventId,
  getEventsByUserId,
  deleteRegister,
};
