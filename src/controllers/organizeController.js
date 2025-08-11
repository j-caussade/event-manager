// Import the organizeService module which contains the business logic for organize operations.
const organizeService = require("../services/organizeService");

/**
 * Creates a new organize entry.
 *
 * This function handles POST requests to create a new entry in the organize table.
 *
 * @param {Object} req - The request object containing eventId and organizerId in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 * @returns {Object} A JSON object with a success message and the created organize entry ID, or an error message.
 */
const createOrganize = async (req, res) => {
  try {
    const { eventId, organizerId } = req.body;
    const organizeId = await organizeService.createOrganize(
      eventId,
      organizerId
    );
    res.status(201).json({
      message: "Organize entry created successfully",
      organizeId: organizeId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all organizers for a specific event.
 *
 * This function handles GET requests to retrieve all organizers for a specific event.
 *
 * @param {Object} req - The request object containing the event ID in the parameters.
 * @param {Object} res - The response object used to send back the list of organizers or an error message.
 * @returns {Object} A JSON object with the list of organizers or an error message.
 */
const getOrganizersByEventId = async (req, res) => {
  try {
    const organizers = await organizeService.getOrganizersByEventId(
      req.params.eventId
    );
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all events for a specific organizer.
 *
 * This function handles GET requests to retrieve all events for a specific organizer.
 *
 * @param {Object} req - The request object containing the organizer ID in the parameters.
 * @param {Object} res - The response object used to send back the list of events or an error message.
 * @returns {Object} A JSON object with the list of events or an error message.
 */
const getEventsByOrganizerId = async (req, res) => {
  try {
    const events = await organizeService.getEventsByOrganizerId(
      req.params.organizerId
    );
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Deletes an organize entry.
 *
 * This function handles DELETE requests to remove an entry from the organize table.
 *
 * @param {Object} req - The request object containing the event ID and organizer ID in the parameters.
 * @param {Object} res - The response object used to send back a confirmation message or an error message.
 * @returns {Object} A JSON object with a confirmation message or an error message.
 */
const deleteOrganize = async (req, res) => {
  try {
    await organizeService.deleteOrganize(
      req.params.eventId,
      req.params.organizerId
    );
    res.status(200).send({
      message: `Organize entry deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrganize,
  getOrganizersByEventId,
  getEventsByOrganizerId,
  deleteOrganize,
};
