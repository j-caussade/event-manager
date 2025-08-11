// Import the organizerService module which contains the business logic for organizer operations.
const organizerService = require("../services/organizerService");

/**
 * Creates a new organizer.
 *
 * This function handles the creation of a new organizer by calling the corresponding service method.
 * It expects the organizer data to be provided in the request body.
 *
 * @param {Object} req - The request object containing organizer data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created organizer, or an error message.
 */
const createOrganizer = async (req, res) => {
  try {
    // Call the createOrganizer method from organizerService with the request body.
    const organizer = await organizerService.createOrganizer(req.body);
    // Send a success response with status code 201 (Created) and the created organizer.
    res.status(201).json({
      message: "Organizer created successfully",
      organizer: organizer,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all organizers.
 *
 * This function fetches all organizers by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of organizers or an error message.
 * @returns {Object} A JSON object with the list of organizers or an error message.
 */
const getAllOrganizers = async (req, res) => {
  try {
    // Call the getAllOrganizers method from organizerService to retrieve all organizers.
    const organizers = await organizerService.getAllOrganizers();
    // Send a success response with the list of organizers.
    res.json(organizers);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves an organizer by its ID.
 *
 * This function fetches a specific organizer by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the organizer ID in the parameters.
 * @param {Object} res - The response object used to send back the organizer or an error message.
 * @returns {Object} A JSON object with the retrieved organizer or an error message.
 */
const getOrganizerById = async (req, res) => {
  try {
    // Call the getOrganizerById method from organizerService with the organizer ID from request parameters.
    const organizer = await organizerService.getOrganizerById(req.params.id);
    // Send a success response with the retrieved organizer.
    res.json(organizer);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing organizer.
 *
 * This function updates an organizer by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the organizer ID in the parameters and updated organizer data in the body.
 * @param {Object} res - The response object used to send back the updated organizer or an error message.
 * @returns {Object} A JSON object with the updated organizer or an error message.
 */
const updateOrganizer = async (req, res) => {
  try {
    // Call the updateOrganizer method from organizerService with the organizer ID from request parameters and the request body.
    const organizer = await organizerService.updateOrganizer(
      req.params.id,
      req.body
    );
    // Send a success response with the updated organizer.
    res.json(organizer);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes an organizer by its ID.
 *
 * This function deletes a specific organizer by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the organizer ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteOrganizer = async (req, res) => {
  try {
    // Call the deleteOrganizer method from organizerService with the organizer ID from request parameters.
    await organizerService.deleteOrganizer(req.params.id);
    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `Organizer ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createOrganizer,
  getAllOrganizers,
  getOrganizerById,
  updateOrganizer,
  deleteOrganizer,
};
