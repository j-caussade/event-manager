/**
 * @fileoverview Service functions for handling database operations related to locations.
 * Provides CRUD (Create, Read, Update, Delete) operations for the 'locations' table.
 * Uses a MySQL connection pool for efficient database interaction.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new location in the database.
 *
 * @async
 * @function createLocation
 * @param {Object} locationData - The data of the location to be created.
 * @param {string} locationData.location_name - Name of the location.
 * @param {number} locationData.postal_code_id - ID of the associated postal code.
 * @param {number} locationData.city_id - ID of the associated city.
 * @param {string} [locationData.location_address] - Address of the location (optional).
 * @returns {Promise<number>} The ID of the newly created location.
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
 * @async
 * @function getAllLocations
 * @returns {Promise<Array<Object>>} An array of location objects.
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
 * @async
 * @function getLocationById
 * @param {number} locationId - The ID of the location to retrieve.
 * @returns {Promise<Object|null>} The location object if found, otherwise null.
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
    return rows[0] || null;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving location:", error);
    throw error;
  }
};

/**
 * Updates an existing location in the database.
 *
 * @async
 * @function updateLocation
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
 * @async
 * @function deleteLocation
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

/**
 * Exports the service functions for use in other parts of the application.
 * @module services/organizerService
 * @property {Function} createLocation - Creates a new location.
 * @property {Function} getAllLocations - Retrieves all locations.
 * @property {Function} getLocationById - Retrieves a location by ID.
 * @property {Function} updateLocation - Updates a location.
 * @property {Function} deleteLocation - Deletes a location.
 */
module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
