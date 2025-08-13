/**
 * @fileoverview Service functions for handling database operations related to organizers.
 * Provides CRUD operations and other business logic for the organizers entity.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new organizer in the database.
 * @async
 * @function createOrganizer
 * @param {Object} organizerData - The organizer data to be inserted.
 * @param {string} organizerData.organizer_name - Name of the organizer.
 * @param {string} [organizerData.organizer_description] - Optional description of the organizer.
 * @param {string} [organizerData.organizer_contact] - Optional contact information.
 * @returns {Promise<number>} The ID of the newly created organizer.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createOrganizer = async (organizerData) => {
  try {
    // Execute the SQL query to insert a new organizer into the database
    const [result] = await pool.query(
      "INSERT INTO organizers SET ?",
      organizerData
    );
    // Return the ID of the newly created organizer
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating organizer:", error);
    throw error;
  }
};

/**
 * Retrieves all organizers from the database.
 * @async
 * @function getAllOrganizers
 * @returns {Promise<Array<Object>>} An array of organizer objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllOrganizers = async () => {
  try {
    // Execute the SQL query to select all organizers from the database
    const [rows] = await pool.query("SELECT * FROM organizers");
    // Return the array of organizers
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving organizers:", error);
    throw error;
  }
};

/**
 * Retrieves a specific organizer by its ID from the database.
 * @async
 * @function getOrganizerById
 * @param {number} organizerId - The ID of the organizer to retrieve.
 * @returns {Promise<Object|null>} The organizer object if found, otherwise null.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getOrganizerById = async (organizerId) => {
  try {
    // Execute the SQL query to select an organizer by its ID from the database
    const [rows] = await pool.query(
      "SELECT * FROM organizers WHERE organizer_id = ?",
      [organizerId]
    );
    // Return the first organizer found (should be the only one if organizer_id is unique)
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving organizer:", error);
    throw error;
  }
};

/**
 * Updates an existing organizer in the database.
 * @async
 * @function updateOrganizer
 * @param {number} organizerId - The ID of the organizer to update.
 * @param {Object} organizerData - The new data for the organizer.
 * @param {string} [organizerData.organizer_name] - Updated name of the organizer.
 * @param {string} [organizerData.organizer_description] - Updated description of the organizer.
 * @param {string} [organizerData.organizer_contact] - Updated contact information.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateOrganizer = async (organizerId, organizerData) => {
  try {
    // Execute the SQL query to update an organizer's data in the database
    await pool.query("UPDATE organizers SET ? WHERE organizer_id = ?", [
      organizerData,
      organizerId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating organizer:", error);
    throw error;
  }
};

/**
 * Deletes an organizer from the database.
 * @async
 * @function deleteOrganizer
 * @param {number} organizerId - The ID of the organizer to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteOrganizer = async (organizerId) => {
  try {
    // Execute the SQL query to delete an organizer from the database
    await pool.query("DELETE FROM organizers WHERE organizer_id = ?", [
      organizerId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting organizer:", error);
    throw error;
  }
};

/**
 * Exports the service functions for use in other parts of the application.
 * @module services/organizerService
 * @exports {Object} An object containing all organizer service functions.
 */
module.exports = {
  createOrganizer,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
};
