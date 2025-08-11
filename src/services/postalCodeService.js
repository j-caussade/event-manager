// Import the database connection pool from the utils directory
const { pool } = require("../utils/db");

/**
 * Creates a new postal code in the database.
 *
 * This function inserts a new postal code into the database using the provided postal code data.
 *
 * @param {Object} postalCodeData - The data of the postal code to be created.
 * @returns {number} The ID of the newly created postal code.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createPostalCode = async (postalCodeData) => {
  try {
    // Execute the SQL query to insert a new postal code into the database
    const [result] = await pool.query(
      "INSERT INTO postal_codes SET ?",
      postalCodeData
    );
    // Return the ID of the newly created postal code
    return result.insertId;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error creating postal code:", error);
    throw error;
  }
};

/**
 * Retrieves all postal codes from the database.
 *
 * This function fetches all postal codes stored in the database.
 *
 * @returns {Array} An array of postal code objects.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getAllPostalCodes = async () => {
  try {
    // Execute the SQL query to select all postal codes from the database
    const [rows] = await pool.query("SELECT * FROM postal_codes");
    // Return the array of postal codes
    return rows;
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving postal codes:", error);
    throw error;
  }
};

/**
 * Retrieves a specific postal code by its ID from the database.
 *
 * This function fetches a single postal code based on the provided postal code ID.
 *
 * @param {number} postalCodeId - The ID of the postal code to retrieve.
 * @returns {Object} The postal code object.
 * @throws {Error} Throws an error if the database operation fails.
 */
const getPostalCodeById = async (postalCodeId) => {
  try {
    // Execute the SQL query to select a postal code by its ID from the database
    const [rows] = await pool.query(
      "SELECT * FROM postal_codes WHERE postal_code_id = ?",
      [postalCodeId]
    );
    // Return the first postal code found (should be the only one if postal_code_id is unique)
    return rows[0];
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error while retrieving postal code:", error);
    throw error;
  }
};

/**
 * Updates an existing postal code in the database.
 *
 * This function updates a postal code's data based on the provided postal code ID and new postal code data.
 *
 * @param {number} postalCodeId - The ID of the postal code to update.
 * @param {Object} postalCodeData - The new data for the postal code.
 * @throws {Error} Throws an error if the database operation fails.
 */
const updatePostalCode = async (postalCodeId, postalCodeData) => {
  try {
    // Execute the SQL query to update a postal code's data in the database
    await pool.query("UPDATE postal_codes SET ? WHERE postal_code_id = ?", [
      postalCodeData,
      postalCodeId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error updating postal code:", error);
    throw error;
  }
};

/**
 * Deletes a postal code from the database.
 *
 * This function removes a postal code from the database based on the provided postal code ID.
 *
 * @param {number} postalCodeId - The ID of the postal code to delete.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deletePostalCode = async (postalCodeId) => {
  try {
    // Execute the SQL query to delete a postal code from the database
    await pool.query("DELETE FROM postal_codes WHERE postal_code_id = ?", [
      postalCodeId,
    ]);
  } catch (error) {
    // Log the error and re-throw it to be handled by the calling function
    console.error("Error deleting postal code:", error);
    throw error;
  }
};

// Export the service functions to be used in other parts of the application
module.exports = {
  createPostalCode,
  getAllPostalCodes,
  getPostalCodeById,
  updatePostalCode,
  deletePostalCode,
};
