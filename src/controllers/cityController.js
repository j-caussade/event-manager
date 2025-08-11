// Import the cityService module which contains the business logic for city operations.
const cityService = require("../services/cityService");

/**
 * Creates a new city.
 *
 * This function handles the creation of a new city by calling the corresponding service method.
 * It expects the city data to be provided in the request body.
 *
 * @param {Object} req - The request object containing city data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created city, or an error message.
 */
const createCity = async (req, res) => {
  try {
    // Call the createCity method from cityService with the request body.
    const city = await cityService.createCity(req.body);

    // Send a success response with status code 201 (Created) and the created city.
    res.status(201).json({
      message: "City created successfully",
      city: city,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all cities.
 *
 * This function fetches all cities by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of cities or an error message.
 * @returns {Object} A JSON object with the list of cities or an error message.
 */
const getAllCities = async (req, res) => {
  try {
    // Call the getAllities method from cityService to retrieve all cities.
    const cities = await cityService.getAllCities();

    // Send a success response with the list of cities.
    res.json(cities);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves an city by its ID.
 *
 * This function fetches a specific city by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the city ID in the parameters.
 * @param {Object} res - The response object used to send back the city or an error message.
 * @returns {Object} A JSON object with the retrieved city or an error message.
 */
const getCityById = async (req, res) => {
  try {
    // Call the getCityById method from cityService with the city ID from request parameters.
    const city = await cityService.getCityById(req.params.id);

    // Send a success response with the retrieved city.
    res.json(city);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing city.
 *
 * This function updates an city by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the city ID in the parameters and updated city data in the body.
 * @param {Object} res - The response object used to send back the updated city or an error message.
 * @returns {Object} A JSON object with the updated city or an error message.
 */
const updateCity = async (req, res) => {
  try {
    // Call the updateCity method from cityService with the city ID from request parameters and the request body.
    const city = await cityService.updateCity(req.params.id, req.body);

    // Send a success response with the updated city.
    res.json(city);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes an city by its ID.
 *
 * This function deletes a specific city by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the city ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteCity = async (req, res) => {
  try {
    // Call the deleteCity method from cityService with the city ID from request parameters.
    await cityService.deleteCity(req.params.id);

    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `City ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
