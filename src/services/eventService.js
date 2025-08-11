const { pool } = require("../utils/db");

// Récupérer tous les événements
const getAllEvents = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
};
