// Import the locationService module which contains the business logic for location operations.
const locationService = require("../services/locationService");

/**
 * Creates a new location.
 *
 * This function handles the creation of a new location by calling the corresponding service method.
 * It expects the location data to be provided in the request body.
 *
 * @param {Object} req - The request object containing location data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created location, or an error message.
 */
const createLocation = async (req, res) => {
  try {
    // Call the createLocation method from locationService with the request body.
    const location = await locationService.createLocation(req.body);
    // Send a success response with status code 201 (Created) and the created location.
    res.status(201).json({
      message: "Location created successfully",
      location: location,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all locations.
 *
 * This function fetches all locations by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of locations or an error message.
 * @returns {Object} A JSON object with the list of locations or an error message.
 */
const getAllLocations = async (req, res) => {
  try {
    // Call the getAllLocations method from locationService to retrieve all locations.
    const locations = await locationService.getAllLocations();
    // Send a success response with the list of locations.
    res.json(locations);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a location by its ID.
 *
 * This function fetches a specific location by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the location ID in the parameters.
 * @param {Object} res - The response object used to send back the location or an error message.
 * @returns {Object} A JSON object with the retrieved location or an error message.
 */
const getLocationById = async (req, res) => {
  try {
    // Call the getLocationById method from locationService with the location ID from request parameters.
    const location = await locationService.getLocationById(req.params.id);
    // Send a success response with the retrieved location.
    res.json(location);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing location.
 *
 * This function updates a location by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the location ID in the parameters and updated location data in the body.
 * @param {Object} res - The response object used to send back the updated location or an error message.
 * @returns {Object} A JSON object with the updated location or an error message.
 */
const updateLocation = async (req, res) => {
  try {
    // Call the updateLocation method from locationService with the location ID from request parameters and the request body.
    const location = await locationService.updateLocation(
      req.params.id,
      req.body
    );
    // Send a success response with the updated location.
    res.json(location);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a location by its ID.
 *
 * This function deletes a specific location by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the location ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteLocation = async (req, res) => {
  try {
    // Call the deleteLocation method from locationService with the location ID from request parameters.
    await locationService.deleteLocation(req.params.id);
    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `Location ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
