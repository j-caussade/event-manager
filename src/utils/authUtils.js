/**
 * @fileoverview Utility functions for handling JWT tokens and user extraction.
 * This module provides reusable functions to extract and verify user information from JWT tokens.
 */
const jwt = require("jsonwebtoken");

/**
 * Extracts and verifies the user ID from the Authorization header.
 *
 * This function checks for a valid JWT token in the Authorization header,
 * verifies it, and returns the user ID if the token is valid.
 *
 * @param {Object} req - The request object containing the Authorization header.
 * @returns {number|null} The user ID if the token is valid, otherwise null.
 */
const extractUserIdFromToken = (req) => {
  try {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) return null;
    // Extract the token from the "Bearer TOKEN" format
    const token = authHeader.split(" ")[1];
    if (!token) return null;
    // Verify the token and return the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    // If the token is invalid or expired, return null
    console.error("JWT verification error:", error);
    return null;
  }
};

module.exports = {
  extractUserIdFromToken,
};
