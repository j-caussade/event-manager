/**
 * @fileoverview Utility functions for data validation and sanitization.
 * These functions are designed to be reusable, framework-agnostic, and focused on data integrity and security.
 */

// Import validator for data validation
const validator = require("validator");

/**
 * Sanitizes a string by trimming whitespace and escaping HTML special characters.
 * @param {string} str - The input string to sanitize.
 * @returns {string|null} The sanitized string, or null if the input is empty after trimming.
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;
  const trimmed = str.trim();
  return trimmed === "" ? null : validator.escape(trimmed);
};

const sanitizeEmail = (email) => {
  if (typeof email !== "string") return email;
  return email.trim();
};

/**
 * Validates a user's first or last name.
 * @param {string} name - The name to validate.
 * @returns {Object} An object with `valid` (boolean) and `error` (string, if invalid).
 */
const validateName = (name) => {
  if (!validator.matches(name, /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,49}$/)) {
    return {
      valid: false,
      error:
        "First and last name must contain only letters, spaces, hyphens, or apostrophes (max 49 characters).",
    };
  }
  return { valid: true };
};

/**
 * Validates an email address.
 * @param {string} email - The email to validate.
 * @returns {Object} An object with `valid` (boolean) and `error` (string, if invalid).
 */
const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    return { valid: false, error: "Invalid email format." };
  }
  if (
    !validator.matches(
      email,
      /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?){0,253}$/
    )
  ) {
    return {
      valid: false,
      error:
        "Email must contain only letters, numbers, periods, underscores, hyphens, and at least one at sign (@).",
    };
  }
  return { valid: true };
};

/**
 * Validates a password for strength.
 * @param {string} password - The password to validate.
 * @returns {Object} An object with `valid` (boolean) and `error` (string, if invalid).
 */
const validatePassword = (password) => {
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return {
      valid: false,
      error:
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one symbol.",
    };
  }
  return { valid: true };
};

module.exports = {
  sanitizeString,
  sanitizeEmail,
  validateName,
  validateEmail,
  validatePassword,
};
