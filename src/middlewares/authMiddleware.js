// Import the dotenv module for environment variable configuration
require("dotenv").config();
// Import jsonwebtoken for token verification
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate the user based on a JWT.
 *
 * This middleware verifies the token provided in the Authorization header.
 * If the token is missing or invalid, it sends an appropriate error response.
 * If the verification succeeds, it adds the decoded user information to the request object.
 *
 * @param {Object} req - The request object containing the Authorization header.
 * @param {Object} res - The response object used to send back an error message if authentication fails.
 * @param {Function} next - The next middleware function in the stack.
 */
const authenticate = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  // If no token is provided, send an error response
  if (!token) {
    return res.status(401).send({ error: "Access denied: No token provided" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure decoded contains user information
    next(); // Proceed to the next middleware function
  } catch (error) {
    // If the token is invalid, send an error response
    res.status(400).send({ error: "Invalid token" });
  }
};

/**
 * Middleware to authorize the user based on roles.
 *
 * This middleware checks if the user has the required admin status.
 * If the user's role does not match the required status, it sends a 403 Forbidden response.
 * If the user is authorized, it proceeds to the next middleware function.
 *
 * @param {boolean} requiredAdminStatus - The required admin status to access the route.
 * @returns {Function} A middleware function that checks user authorization.
 */
const authorize = (requiredAdminStatus) => {
  return (req, res, next) => {
    // Check if the user has the required admin status
    if (req.user.role !== requiredAdminStatus) {
      return res
        .status(403)
        .send({ error: "Access denied: Insufficient privileges" });
    }

    // If the user is authorized, proceed to the next middleware function
    next();
  };
};

module.exports = { authenticate, authorize };
