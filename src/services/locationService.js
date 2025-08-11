// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new location in the database.
 *
 * This function inserts a new location into the database using the provided location data.
 *
 * @param {Object} locationData - The data of the location to be created.
 * @returns {number} The ID of the newly created location.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createLocation = async (locationData) => {
  try {
    // Execute the SQL query to insert a new location into the database
    const [result] = await pool.query(
      "INSERT INTO locations SET ?",
      locationData
    );
    // Return the ID of the newly created location
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating location:", error);
    throw error;
  }
};

/**
 * Retrieves all locations from the database.
 *
 * This function fetches all locations stored in the database.
 *
 * @returns {Array} An array of location objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllLocations = async () => {
  try {
    // Execute the SQL query to select all locations from the database
    const [rows] = await pool.query("SELECT * FROM locations");
    // Return the array of locations
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving locations:", error);
    throw error;
  }
};

/**
 * Retrieves a specific location by its ID from the database.
 *
 * This function fetches a single location based on the provided location ID.
 *
 * @param {number} locationId - The ID of the location to retrieve.
 * @returns {Object} The location object.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getLocationById = async (locationId) => {
  try {
    // Execute the SQL query to select a location by its ID from the database
    const [rows] = await pool.query(
      "SELECT * FROM locations WHERE location_id = ?",
      [locationId]
    );
    // Return the first location found (should be the only one if location_id is unique)
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving location:", error);
    throw error;
  }
};

/**
 * Updates an existing location in the database.
 *
 * This function updates a location's data based on the provided location ID and new location data.
 *
 * @param {number} locationId - The ID of the location to update.
 * @param {Object} locationData - The new data for the location.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateLocation = async (locationId, locationData) => {
  try {
    // Execute the SQL query to update a location's data in the database
    await pool.query("UPDATE locations SET ? WHERE location_id = ?", [
      locationData,
      locationId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating location:", error);
    throw error;
  }
};

/**
 * Deletes a location from the database.
 *
 * This function removes a location from the database based on the provided location ID.
 *
 * @param {number} locationId - The ID of the location to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteLocation = async (locationId) => {
  try {
    // Execute the SQL query to delete a location from the database
    await pool.query("DELETE FROM locations WHERE location_id = ?", [
      locationId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting location:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
