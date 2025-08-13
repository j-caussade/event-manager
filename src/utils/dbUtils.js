/**
 * @fileoverview Utility functions for managing MySQL database connections.
 * Provides a connection pool and helper functions to interact with the database efficiently.
 * Uses mysql2/promise for promise-based asynchronous operations.
 */
const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

/**
 * MySQL connection pool.
 * Manages a set of database connections for better performance and resource utilization.
 * @type {import('mysql2/promise').Pool}
 */
const pool = mysql.createPool(dbConfig);

/**
 * Retrieves a connection from the connection pool.
 * @async
 * @function getConnection
 * @returns {Promise<Object>} A promise that resolves to a database connection object.
 * @throws {Error} Throws an error if the connection attempt fails.
 */
const getConnection = async () => {
  try {
    // Retrieve a connection from the pool
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database");
    return connection;
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error connecting to the database:", err);
    // Re-throw the error to be handled by the calling function
    throw err;
  }
};

/**
 * Exports the connection pool and utility functions for use in other modules.
 * @module utils/dbUtils
 * @property {Function} getConnection - Function to retrieve a database connection.
 * @property {import('mysql2/promise').Pool} pool - MySQL connection pool.
 */
module.exports = { getConnection, pool };
