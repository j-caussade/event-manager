/**
 * @fileoverview Service functions for handling database operations related to cities.
 * Provides CRUD (Create, Read, Update, Delete) operations for cities in the database.
 * Uses a connection pool for efficient database interaction.
 */

// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new city in the database.
 * Inserts a new city record using the provided city data.
 *
 * @async
 * @function createCity
 * @param {Object} cityData - The data of the city to be created.
 * @param {string} cityData.city_name - The name of the city.
 * @param {number} [cityData.postal_code_id] - Optional: The ID of the associated postal code.
 * @returns {Promise<number>} The ID of the newly created city.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createCity = async (cityData) => {
  try {
    // Execute the SQL query to insert a new city into the database
    const [result] = await pool.query("INSERT INTO cities SET ?", cityData);
    // Return the ID of the newly created city
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating city:", error);
    throw error;
  }
};

/**
 * Retrieves all cities from the database.
 * Fetches all city records stored in the database.
 *
 * @async
 * @function getAllCities
 * @returns {Promise<Array<Object>>} An array of city objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllCities = async () => {
  try {
    // Execute the SQL query to select all cities from the database
    const [rows] = await pool.query("SELECT * FROM cities");
    // Return the array of cities
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving cities:", error);
    throw error;
  }
};

/**
 * Retrieves a specific city by its ID from the database.
 * Fetches a single city record based on the provided city ID.
 *
 * @async
 * @function getCityById
 * @param {number} cityId - The ID of the city to retrieve.
 * @returns {Promise<Object|null>} The city object if found, otherwise null.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getCityById = async (cityId) => {
  try {
    // Execute the SQL query to select a city by its ID from the database
    const [rows] = await pool.query("SELECT * FROM cities WHERE city_id = ?", [
      cityId,
    ]);
    // Return the first city found (should be the only one if city_id is unique)
    return rows[0] || null;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving city:", error);
    throw error;
  }
};

/**
 * Updates an existing city in the database.
 * Updates a city's data based on the provided city ID and new city data.
 *
 * @async
 * @function updateCity
 * @param {number} cityId - The ID of the city to update.
 * @param {Object} cityData - The new data for the city.
 * @param {string} [cityData.city_name] - Optional: The updated name of the city.
 * @param {number} [cityData.postal_code_id] - Optional: The updated ID of the associated postal code.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateCity = async (cityId, cityData) => {
  try {
    // Execute the SQL query to update a city's data in the database
    await pool.query("UPDATE cities SET ? WHERE city_id = ?", [
      cityData,
      cityId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating city:", error);
    throw error;
  }
};

/**
 * Deletes a city from the database.
 * Removes a city record from the database based on the provided city ID.
 *
 * @async
 * @function deleteCity
 * @param {number} cityId - The ID of the city to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteCity = async (cityId) => {
  try {
    // Execute the SQL query to delete a city from the database
    await pool.query("DELETE FROM cities WHERE city_id = ?", [cityId]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting city:", error);
    throw error;
  }
};

/**
 * Exports the service functions for use in other parts of the application.
 * @module services/cityService
 * @property {Function} createCity - Creates a new city in the database.
 * @property {Function} getAllCities - Retrieves all cities from the database.
 * @property {Function} getCityById - Retrieves a city by its ID.
 * @property {Function} updateCity - Updates an existing city in the database.
 * @property {Function} deleteCity - Deletes a city from the database.
 */
module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
