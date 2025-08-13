// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new organizer in the database.
 *
 * This function inserts a new organizer into the database using the provided organizer data.
 *
 * @param {Object} organizerData - The data of the organizer to be created.
 * @returns {number} The ID of the newly created organizer.
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
 *
 * This function fetches all organizers stored in the database.
 *
 * @returns {Array} An array of organizer objects.
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
 *
 * This function fetches a single organizer based on the provided organizer ID.
 *
 * @param {number} organizerId - The ID of the organizer to retrieve.
 * @returns {Object} The organizer object.
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
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving organizer:", error);
    throw error;
  }
};

/**
 * Updates an existing organizer in the database.
 *
 * This function updates an organizer's data based on the provided organizer ID and new organizer data.
 *
 * @param {number} organizerId - The ID of the organizer to update.
 * @param {Object} organizerData - The new data for the organizer.
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
 *
 * This function removes an organizer from the database based on the provided organizer ID.
 *
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

// Export the service functions to be used in other parts of the application
module.exports = {
  createOrganizer,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
};
