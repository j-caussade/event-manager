// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new event in the database.
 *
 * This function inserts a new event into the database using the provided event data.
 *
 * @param {Object} eventData - The data of the event to be created.
 * @returns {number} The ID of the newly created event.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createEvent = async (eventData) => {
  try {
    // Execute the SQL query to insert a new event into the database
    const [result] = await pool.query("INSERT INTO events SET ?", eventData);

    // Return the ID of the newly created event
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating event:", error);
    throw error;
  }
};

/**
 * Retrieves all events from the database.
 *
 * This function fetches all events stored in the database.
 *
 * @returns {Array} An array of event objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllEvents = async () => {
  try {
    // Execute the SQL query to select all events from the database
    const [rows] = await pool.query("SELECT * FROM events");

    // Return the array of events
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving events:", error);
    throw error;
  }
};

/**
 * Retrieves a specific event by its ID from the database.
 *
 * This function fetches a single event based on the provided event ID.
 *
 * @param {number} eventId - The ID of the event to retrieve.
 * @returns {Object} The event object.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getEventById = async (eventId) => {
  try {
    // Execute the SQL query to select an event by its ID from the database
    const [rows] = await pool.query("SELECT * FROM events WHERE event_id = ?", [
      eventId,
    ]);

    // Return the first event found (should be the only one if event_id is unique)
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving event:", error);
    throw error;
  }
};

/**
 * Updates an existing event in the database.
 *
 * This function updates an event's data based on the provided event ID and new event data.
 *
 * @param {number} eventId - The ID of the event to update.
 * @param {Object} eventData - The new data for the event.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateEvent = async (eventId, eventData) => {
  try {
    // Execute the SQL query to update an event's data in the database
    await pool.query("UPDATE events SET ? WHERE event_id = ?", [
      eventData,
      eventId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating event:", error);
    throw error;
  }
};

/**
 * Deletes an event from the database.
 *
 * This function removes an event from the database based on the provided event ID.
 *
 * @param {number} eventId - The ID of the event to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteEvent = async (eventId) => {
  try {
    // Execute the SQL query to delete an event from the database
    await pool.query("DELETE FROM events WHERE event_id = ?", [eventId]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting event:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
