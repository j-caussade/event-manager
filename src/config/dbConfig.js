/**
 * @fileoverview MySQL database connection configuration.
 * Centralizes connection parameters for easy environment management and deployment.
 * Uses environment variables to ensure security and flexibility across different environments (development, staging, production).
 */
const dbConfig = {
  /**
   * Database server address.
   * @type {string}
   * @default process.env.DB_HOST
   */
  host: process.env.DB_HOST,
  /**
   * Database username for authentication.
   * @type {string}
   * @default process.env.DB_USER
   */
  user: process.env.DB_USER,
  /**
   * Database password for authentication.
   * @type {string}
   * @default process.env.DB_PASSWORD
   */
  password: process.env.DB_PASSWORD,
  /**
   * Name of the database to connect to.
   * @type {string}
   * @default process.env.DB_NAME
   */
  database: process.env.DB_NAME,
  /**
   * Whether the pool should wait for a connection to become available
   * if the connection limit is reached.
   * @type {boolean}
   * @default true
   */
  waitForConnections: true,
  /**
   * Maximum number of connections to create at once.
   * @type {number}
   * @default 10
   */
  connectionLimit: 10,
  /**
   * Maximum number of connection requests the pool will queue
   * before returning an error from pool.getConnection().
   * Set to 0 for unlimited.
   * @type {number}
   * @default 0
   */
  queueLimit: 0,
};

/**
 * Exports the database configuration object.
 * @module config/dbConfig
 */
module.exports = dbConfig;
