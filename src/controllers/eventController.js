const eventService = require("../services/eventService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
};
