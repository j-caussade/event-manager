// Import the postalCodeService module which contains the business logic for postal code operations.
const postalCodeService = require("../services/postalCodeService");

/**
 * Creates a new postal code.
 *
 * This function handles the creation of a new postal code by calling the corresponding service method.
 * It expects the postal code data to be provided in the request body.
 *
 * @param {Object} req - The request object containing postal code data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created postal code, or an error message.
 */
const createPostalCode = async (req, res) => {
  try {
    // Call the createPostalCode method from postalCodeService with the request body.
    const postalCode = await postalCodeService.createPostalCode(req.body);
    // Send a success response with status code 201 (Created) and the created postal code.
    res.status(201).json({
      message: "Postal code created successfully",
      postalCode: postalCode,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all postal codes.
 *
 * This function fetches all postal codes by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of postal codes or an error message.
 * @returns {Object} A JSON object with the list of postal codes or an error message.
 */
const getAllPostalCodes = async (req, res) => {
  try {
    // Call the getAllPostalCodes method from postalCodeService to retrieve all postal codes.
    const postalCodes = await postalCodeService.getAllPostalCodes();
    // Send a success response with the list of postal codes.
    res.json(postalCodes);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a postal code by its ID.
 *
 * This function fetches a specific postal code by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the postal code ID in the parameters.
 * @param {Object} res - The response object used to send back the postal code or an error message.
 * @returns {Object} A JSON object with the retrieved postal code or an error message.
 */
const getPostalCodeById = async (req, res) => {
  try {
    // Call the getPostalCodeById method from postalCodeService with the postal code ID from request parameters.
    const postalCode = await postalCodeService.getPostalCodeById(req.params.id);
    // Send a success response with the retrieved postal code.
    res.json(postalCode);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing postal code.
 *
 * This function updates a postal code by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the postal code ID in the parameters and updated postal code data in the body.
 * @param {Object} res - The response object used to send back the updated postal code or an error message.
 * @returns {Object} A JSON object with the updated postal code or an error message.
 */
const updatePostalCode = async (req, res) => {
  try {
    // Call the updatePostalCode method from postalCodeService with the postal code ID from request parameters and the request body.
    const postalCode = await postalCodeService.updatePostalCode(
      req.params.id,
      req.body
    );
    // Send a success response with the updated postal code.
    res.json(postalCode);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a postal code by its ID.
 *
 * This function deletes a specific postal code by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the postal code ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deletePostalCode = async (req, res) => {
  try {
    // Call the deletePostalCode method from postalCodeService with the postal code ID from request parameters.
    await postalCodeService.deletePostalCode(req.params.id);
    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `Postal code ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createPostalCode,
  getAllPostalCodes,
  getPostalCodeById,
  updatePostalCode,
  deletePostalCode,
};
