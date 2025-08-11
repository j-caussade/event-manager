const mysql = require("mysql2/promise"); // Utilisez la version promise pour une gestion asynchrone plus facile

// Créer une pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fonction pour obtenir une connexion de la pool
const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connecté à la base de données MySQL");
    return connection;
  } catch (err) {
    console.error("Erreur de connexion à la base de données:", err);
    throw err;
  }
};

module.exports = { getConnection, pool };
