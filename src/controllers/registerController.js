// Import the organizeService module which contains the business logic for organize operations.
const registerService = require("../services/registerService");

/**
 * Creates a new registration.
 *
 * This function handles POST requests to create a new registration.
 *
 * @param {Object} req - The request object containing userId and eventId in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created registration ID, or an error message.
 */
const createRegister = async (req, res) => {
  try {
    // Call the createRegister method from registerService with the user ID and event ID from request body.
    const { userId, eventId } = req.body;
    const registerId = await registerService.createRegister(userId, eventId);
    // Send a success response with a confirmation message.
    res.status(201).json({
      message: "Registration created successfully",
      registerId: registerId,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all registrations for a specific event.
 *
 * This function handles GET requests to retrieve all registrations for a specific event.
 *
 * @param {Object} req - The request object containing the event ID in the parameters.
 * @param {Object} res - The response object used to send back the list of registrations or an error message.
 * @returns {Object} A JSON object with the list of registrations or an error message.
 */
const getRegistrationsByEventId = async (req, res) => {
  try {
    // Call the getRegistrationsByEventId method from registerService with the event ID from request parameters.
    const registrations = await registerService.getRegistrationsByEventId(
      req.params.eventId
    );
    // Send a success response with the list of registrations.
    res.json(registrations);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all events a specific user is registered for.
 *
 * This function handles GET requests to retrieve all events a specific user is registered for.
 *
 * @param {Object} req - The request object containing the user ID in the parameters.
 * @param {Object} res - The response object used to send back the list of events or an error message.
 * @returns {Object} A JSON object with the list of events or an error message.
 */
const getEventsByUserId = async (req, res) => {
  try {
    // Call the getEventsByUserId method from registerService with the user ID from request parameters.
    const events = await registerService.getEventsByUserId(req.params.userId);
    // Send a success response with the list of events.
    res.json(events);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes a registration.
 *
 * This function handles DELETE requests to remove a registration.
 *
 * @param {Object} req - The request object containing the user ID and event ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteRegister = async (req, res) => {
  try {
    // Call the deleteRegister method from registerService with the user ID and event ID from request parameters.
    await registerService.deleteRegister(req.params.userId, req.params.eventId);
    // Send a success response with a confirmation message.
    res.status(200).send({
      message: `Registration deleted successfully`,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRegister,
  getRegistrationsByEventId,
  getEventsByUserId,
  deleteRegister,
};
