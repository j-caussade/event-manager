/**
 * @fileoverview This file contains the service functions for handling database
 * operations related to events. It includes functions for creating, retrieving,
 * updating, and deleting events, as well as retrieving events with their
 * associated locations and organizers. Each function interacts with the
 * database to perform the necessary operations.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new event in the database.
 *
 * This function inserts a new event into the database using the provided event
 * data.
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
    // Return the first event found
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
 * This function updates an event's data based on the provided event ID and new
 * event data.
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
 * This function removes an event from the database based on the provided
 * event ID.
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

/**
 * Retrieves all events with their locations, organizers, and (optionally) user
 * registration status.
 *
 * This function fetches all events along with their associated location and
 * organizer data. If a userId is provided, it also checks whether the user is
 * registered for each event.
 *
 * @param {number|null} userId - The ID of the authenticated user (optional).
 * If provided, the result will include a boolean `is_user_registered` for each
 * event.
 * @returns {Promise<Array>} A promise that resolves to an array of event
 * objects.
 * Each object contains event details, location, organizer, and (if userId is
 * provided) registration status.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllEventsWithLocationsAndOrganizers = async (userId = null) => {
  try {
    // Base SQL query to fetch all events with location and organizer data
    let query = `
      SELECT
        e.event_id,
        e.event_name,
        e.event_start_date,
        (e.event_seats - IFNULL(r.registered_count, 0)) AS remaining_seats,
        e.event_thumbnail,
        l.location_name,
        pc.postal_code_number,
        c.city_name,
        o.organizer_name
    `;
    // If a userId is provided, add a subquery to check if the user is
    // registered for each event
    if (userId) {
      query += `,
        EXISTS (
          SELECT 1 FROM register reg
          WHERE reg.event_id = e.event_id
          AND reg.user_id = ?
        ) AS is_user_registered
      `;
    }
    // Complete the query with JOINs and LEFT JOIN for registration count
    query += `
      FROM events e
      JOIN locations l ON e.location_id = l.location_id
      JOIN postal_codes pc ON l.postal_code_id = pc.postal_code_id
      JOIN cities c ON l.city_id = c.city_id
      JOIN organize org ON e.event_id = org.event_id
      JOIN organizers o ON org.organizer_id = o.organizer_id
      LEFT JOIN (
        SELECT event_id, COUNT(*) AS registered_count
        FROM register
        GROUP BY event_id
      ) r ON e.event_id = r.event_id
    `;
    // Execute the query with userId as a parameter if provided, otherwise no
    // parameters
    const params = userId ? [userId] : [];
    const [rows] = await pool.query(query, params);
    // Return the array of events with their associated data
    return rows;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while retrieving events:", error);
    // Re-throw the error to be handled by the calling function
    throw error;
  }
};

/**
 * Retrieves a specific event by its ID, including its location, organizer, and
 * (optionally) user registration status.
 *
 * This function fetches a single event with its associated location and
 * organizer data. If a userId is provided, it also checks whether the user is
 * registered for the event.
 *
 * @param {number} eventId - The ID of the event to retrieve.
 * @param {number|null} userId - The ID of the authenticated user (optional).
 * If provided, the result will include a boolean `is_user_registered`.
 * @returns {Promise<Object>} A promise that resolves to the event object with
 * location, organizer, and (if userId is provided) registration status.
 * @throws {Error} Throws an error if the database operation fails or if the
 * event is not found.
 */
const getAnEventByIdWithLocationsAndOrganizers = async (
  eventId,
  userId = null
) => {
  try {
    // Base SQL query to fetch the event with location and organizer data
    let query = `
      SELECT
        e.event_id,
        e.event_name,
        e.event_start_date,
        e.event_end_date,
        (e.event_seats - IFNULL(r.registered_count, 0)) AS remaining_seats,
        e.event_description,
        e.event_thumbnail,
        l.location_name,
        pc.postal_code_number,
        c.city_name,
        o.organizer_name
    `;
    // If a userId is provided, add a subquery to check if the user is
    // registered for the event
    if (userId) {
      query += `,
        EXISTS (
          SELECT 1 FROM register reg
          WHERE reg.event_id = e.event_id
          AND reg.user_id = ?
        ) AS is_user_registered
      `;
    }
    // Complete the query with JOINs and LEFT JOIN for registration count
    query += `
      FROM events e
      JOIN locations l ON e.location_id = l.location_id
      JOIN postal_codes pc ON l.postal_code_id = pc.postal_code_id
      JOIN cities c ON l.city_id = c.city_id
      JOIN organize org ON e.event_id = org.event_id
      JOIN organizers o ON org.organizer_id = o.organizer_id
      LEFT JOIN (
        SELECT event_id, COUNT(*) AS registered_count
        FROM register
        GROUP BY event_id
      ) r ON e.event_id = r.event_id
      WHERE e.event_id = ?
    `;
    // Prepare the parameters array: [userId, eventId] if userId is provided,
    // otherwise [eventId]
    const params = userId ? [userId, eventId] : [eventId];
    const [rows] = await pool.query(query, params);
    // If no event is found, throw an error
    if (rows.length === 0) {
      throw new Error("Event not found");
    }
    // Return the first event found
    return rows[0];
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while retrieving event:", error);
    // Re-throw the error to be handled by the calling function
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
  getAllEventsWithLocationsAndOrganizers,
  getAnEventByIdWithLocationsAndOrganizers,
};
