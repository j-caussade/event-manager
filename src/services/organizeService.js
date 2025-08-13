// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new entry in the organize table.
 *
 * @param {number} eventId - The ID of the event.
 * @param {number} organizerId - The ID of the organizer.
 * @returns {number} The ID of the newly created organize entry.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createOrganize = async (eventId, organizerId) => {
  try {
    // Execute the SQL query to insert a new entry into the organize table
    const [result] = await pool.query(
      "INSERT INTO organize (event_id, organizer_id) VALUES (?, ?)",
      [eventId, organizerId]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating organize entry:", error);
    throw error;
  }
};

/**
 * Retrieves all organizers for a specific event.
 *
 * @param {number} eventId - The ID of the event.
 * @returns {Array} An array of organizer objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getOrganizersByEventId = async (eventId) => {
  try {
    // Execute the SQL query to select all organizers for a specific event
    const [rows] = await pool.query(
      "SELECT * FROM organize WHERE event_id = ?",
      [eventId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving organizers:", error);
    throw error;
  }
};

/**
 * Retrieves all events for a specific organizer.
 *
 * @param {number} organizerId - The ID of the organizer.
 * @returns {Array} An array of event objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getEventsByOrganizerId = async (organizerId) => {
  try {
    // Execute the SQL query to select all events for a specific organizer
    const [rows] = await pool.query(
      "SELECT * FROM organize WHERE organizer_id = ?",
      [organizerId]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving events:", error);
    throw error;
  }
};

/**
 * Deletes an entry from the organize table.
 *
 * @param {number} eventId - The ID of the event.
 * @param {number} organizerId - The ID of the organizer.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteOrganize = async (eventId, organizerId) => {
  try {
    // Execute the SQL query to delete an entry from the organize table
    await pool.query(
      "DELETE FROM organize WHERE event_id = ? AND organizer_id = ?",
      [eventId, organizerId]
    );
  } catch (error) {
    console.error("Error deleting organize entry:", error);
    throw error;
  }
};

module.exports = {
  createOrganize,
  getOrganizersByEventId,
  getEventsByOrganizerId,
  deleteOrganize,
};
