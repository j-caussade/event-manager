// Import the eventService module which contains the business logic for event operations.
const eventService = require("../services/eventService");

/**
 * Creates a new event.
 *
 * This function handles the creation of a new event by calling the corresponding service method.
 * It expects the event data to be provided in the request body.
 *
 * @param {Object} req - The request object containing event data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created event, or an error message.
 */
const createEvent = async (req, res) => {
  try {
    // Call the createEvent method from eventService with the request body.
    const event = await eventService.createEvent(req.body);

    // Send a success response with status code 201 (Created) and the created event.
    res.status(201).json({
      message: "Event created successfully",
      event: event,
    });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all events.
 *
 * This function fetches all events by calling the corresponding service method.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the list of events or an error message.
 * @returns {Object} A JSON object with the list of events or an error message.
 */
const getAllEvents = async (req, res) => {
  try {
    // Call the getAllEvents method from eventService to retrieve all events.
    const events = await eventService.getAllEvents();

    // Send a success response with the list of events.
    res.json(events);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves an event by its ID.
 *
 * This function fetches a specific event by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the event ID in the parameters.
 * @param {Object} res - The response object used to send back the event or an error message.
 * @returns {Object} A JSON object with the retrieved event or an error message.
 */
const getEventById = async (req, res) => {
  try {
    // Call the getEventById method from eventService with the event ID from request parameters.
    const event = await eventService.getEventById(req.params.id);

    // Send a success response with the retrieved event.
    res.json(event);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates an existing event.
 *
 * This function updates an event by its ID using data provided in the request body.
 *
 * @param {Object} req - The request object containing the event ID in the parameters and updated event data in the body.
 * @param {Object} res - The response object used to send back the updated event or an error message.
 * @returns {Object} A JSON object with the updated event or an error message.
 */
const updateEvent = async (req, res) => {
  try {
    // Call the updateEvent method from eventService with the event ID from request parameters and the request body.
    const event = await eventService.updateEvent(req.params.id, req.body);

    // Send a success response with the updated event.
    res.json(event);
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes an event by its ID.
 *
 * This function deletes a specific event by its ID using the corresponding service method.
 *
 * @param {Object} req - The request object containing the event ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteEvent = async (req, res) => {
  try {
    // Call the deleteEvent method from eventService with the event ID from request parameters.
    await eventService.deleteEvent(req.params.id);

    // Send a success response with a confirmation message.
    res
      .status(200)
      .send({ message: `Event ${req.params.id} deleted successfully` });
  } catch (error) {
    // If an error occurs, send an error response with status code 500 (Internal Server Error).
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions to be used in other parts of the application.
module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
