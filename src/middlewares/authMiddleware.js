/**
 * @fileoverview Middleware functions for handling authentication and authorization.
 * This module provides middleware to verify JWT tokens and check user privileges.
 * It is used to protect routes that require authentication and/or specific permissions.
 */

// Import the dotenv module for environment variable configuration
require("dotenv").config();
// Import jsonwebtoken for token verification and decoding
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate the user based on a JWT.
 *
 * This middleware verifies the token provided in the Authorization header.
 * The token should be in the format: "Bearer <token>".
 * If the token is missing or invalid, it sends an appropriate error response.
 * If the verification succeeds, it adds the decoded user information to the request object.
 *
 * @function authenticate
 * @memberof module:middlewares/authMiddleware
 *
 * @param {Object} req - The request object containing the Authorization header.
 * @param {string} req.headers.authorization - Authorization header with Bearer token.
 * @param {Object} res - The response object used to send back an error message if authentication fails.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void} Calls next() if authentication succeeds, or sends an error response.
 *
 * @throws {Object} 401 - If no token is provided.
 * @throws {Object} 400 - If the token is invalid.
 */
const authenticate = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers["authorization"];
  // Extract the token from the "Bearer TOKEN" format
  const token = authHeader && authHeader.split(" ")[1];
  // If no token is provided, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({
      error: "Access denied",
      message: "No authentication token provided",
    });
  }
  // Verify the token using the JWT secret from environment variables
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded user information to the request object
    // This makes the user data available to subsequent middleware and route handlers
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      // Include any other relevant user data from the token
    };
    // Proceed to the next middleware function
    next();
  } catch (error) {
    // If the token is invalid, send a 400 Bad Request response
    console.error("JWT verification error:", error);
    res.status(400).json({
      error: "Invalid token",
      message: "The provided authentication token is invalid or has expired",
    });
  }
};

/**
 * Middleware to authorize the user based on roles/privileges.
 *
 * This factory function creates authorization middleware that checks if the user
 * has the required admin status to access a specific route.
 *
 * @function authorize
 * @memberof module:middlewares/authMiddleware
 *
 * @param {boolean} requiredAdminStatus - The required admin status to access the route.
 * @returns {Function} A middleware function that checks user authorization.
 *
 * @example
 * // Require admin privileges (role = true)
 * router.get('/admin', authenticate, authorize(true), adminController.getAdminData);
 */
const authorize = (requiredAdminStatus) => {
  /**
   * Authorization middleware function.
   *
   * @param {Object} req - The request object containing user data from authentication.
   * @param {Object} req.user - User data added by the authenticate middleware.
   * @param {boolean} req.user.role - User's admin status.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   *
   * @returns {void} Calls next() if authorization succeeds, or sends an error response.
   *
   * @throws {Object} 403 - If the user doesn't have sufficient privileges.
   */
  return (req, res, next) => {
    // Check if the user has the required admin status
    // Note: This assumes req.user.role is a boolean where true = admin
    if (req.user.role !== requiredAdminStatus) {
      return res.status(403).json({
        error: "Access denied",
        message: "Insufficient privileges to access this resource",
      });
    }
    // If the user is authorized, proceed to the next middleware function
    next();
  };
};

// Export the middleware functions to be used in route definitions
module.exports = {
  authenticate,
  authorize,
};
