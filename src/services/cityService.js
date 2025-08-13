// Import the database connection pool from the utils directory
const { pool } = require("../utils/dbUtils");

/**
 * Creates a new city in the database.
 *
 * This function inserts a new city into the database using the provided city data.
 *
 * @param {Object} cityData - The data of the city to be created.
 * @returns {number} The ID of the newly created city.
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
 *
 * This function fetches all cities stored in the database.
 *
 * @returns {Array} An array of city objects.
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
 *
 * This function fetches a single city based on the provided city ID.
 *
 * @param {number} cityId - The ID of the city to retrieve.
 * @returns {Object} The city object.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getCityById = async (cityId) => {
  try {
    // Execute the SQL query to select an city by its ID from the database
    const [rows] = await pool.query("SELECT * FROM cities WHERE city_id = ?", [
      cityId,
    ]);

    // Return the first city found (should be the only one if city_id is unique)
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving city:", error);
    throw error;
  }
};

/**
 * Updates an existing city in the database.
 *
 * This function updates an city's data based on the provided city ID and new city data.
 *
 * @param {number} cityId - The ID of the city to update.
 * @param {Object} cityData - The new data for the city.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updateCity = async (cityId, cityData) => {
  try {
    // Execute the SQL query to update an city's data in the database
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
 * Deletes an city from the database.
 *
 * This function removes an city from the database based on the provided city ID.
 *
 * @param {number} cityId - The ID of the city to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deleteCity = async (cityId) => {
  try {
    // Execute the SQL query to delete an city from the database
    await pool.query("DELETE FROM cities WHERE city_id = ?", [cityId]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting city:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
