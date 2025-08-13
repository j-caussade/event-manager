/**
 * @fileoverview Service functions for managing the relationship between events and organizers in the database.
 * Provides CRUD operations for the `organize` table, which links events to their organizers.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new entry in the `organize` table, linking an event to an organizer.
 *
 * @async
 * @function createOrganize
 * @param {number} eventId - The unique identifier of the event.
 * @param {number} organizerId - The unique identifier of the organizer.
 * @returns {Promise<number>} The ID of the newly created `organize` entry.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createOrganize = async (eventId, organizerId) => {
  try {
    // Execute the SQL query to insert a new entry into the `organize` table
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
 * Retrieves all organizers associated with a specific event.
 *
 * @async
 * @function getOrganizersByEventId
 * @param {number} eventId - The unique identifier of the event.
 * @returns {Promise<Array<Object>>} An array of organizer objects linked to the event.
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
 * Retrieves all events associated with a specific organizer.
 *
 * @async
 * @function getEventsByOrganizerId
 * @param {number} organizerId - The unique identifier of the organizer.
 * @returns {Promise<Array<Object>>} An array of event objects linked to the organizer.
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
 * Deletes an entry from the `organize` table, removing the link between an event and an organizer.
 *
 * @async
 * @function deleteOrganize
 * @param {number} eventId - The unique identifier of the event.
 * @param {number} organizerId - The unique identifier of the organizer.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteOrganize = async (eventId, organizerId) => {
  try {
    // Execute the SQL query to delete an entry from the `organize` table
    await pool.query(
      "DELETE FROM organize WHERE event_id = ? AND organizer_id = ?",
      [eventId, organizerId]
    );
  } catch (error) {
    console.error("Error deleting organize entry:", error);
    throw error;
  }
};

/**
 * Exports all service functions for the `organize` table.
 * @module services/organizeService
 * @property {Function} createOrganize - Creates a new event-organizer link.
 * @property {Function} getOrganizersByEventId - Retrieves organizers for a specific event.
 * @property {Function} getEventsByOrganizerId - Retrieves events for a specific organizer.
 * @property {Function} deleteOrganize - Deletes an event-organizer link.
 */
module.exports = {
  createOrganize,
  getOrganizersByEventId,
  getEventsByOrganizerId,
  deleteOrganize,
};
