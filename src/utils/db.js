// Import the mysql2/promise module to use MySQL with promises for easier asynchronous handling
const mysql = require("mysql2/promise");

/**
 * Create a connection pool to the MySQL database.
 *
 * This pool manages a set of connections to the database, allowing for better performance
 * and resource management. The configuration for the pool is provided through environment variables.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database server address
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  waitForConnections: true, // Whether to wait for a connection if none are available
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of queued connection requests
});

/**
 * Function to get a connection from the pool.
 *
 * This function retrieves a connection from the connection pool. It is useful for performing
 * database operations within the context of a single connection.
 *
 * @returns {Promise<Object>} A promise that resolves to a database connection object.
 * @throws {Error} Throws an error if the connection cannot be established.
 */
const getConnection = async () => {
  try {
    // Retrieve a connection from the pool
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database");
    return connection;
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error("Error connecting to the database:", err);
    // Re-throw the error to be handled by the calling function
    throw err;
  }
};

// Export the getConnection function and the pool for use in other parts of the application
module.exports = { getConnection, pool };
