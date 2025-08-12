// Import the Express module
const express = require("express");

// Create a new router object to handle authentication-related routes
const router = express.Router();

// Import the auth controller which contains the logic for handling authentication-related requests
const authController = require("../controllers/authController");

// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to handle user registration.
 *
 * This route handles POST requests to register a new user.
 * It utilizes the `register` function from the authController to process the request.
 *
 * @name post/register
 * @function
 * @memberof module:routers/authRouter
 * @inner
 * @param {string} path - Express path "/register"
 * @param {callback} middleware - Controller function to handle the registration logic
 */
router.post("/register", authController.register);

/**
 * Route to handle user login.
 *
 * This route handles POST requests to log in a user.
 * It utilizes the `login` function from the authController to process the request.
 *
 * @name post/login
 * @function
 * @memberof module:routers/authRouter
 * @inner
 * @param {string} path - Express path "/login"
 * @param {callback} middleware - Controller function to handle the login logic
 */
router.post("/login", authController.login);

/**
 * Protected route example.
 *
 * This route is protected by authentication and authorization middleware.
 * It requires a valid token and admin privileges to access.
 * If authorized, it sends a success message.
 *
 * @name get/protected
 * @function
 * @memberof module:routers/authRouter
 * @inner
 * @param {string} path - Express path "/protected"
 * @param {callback} middleware - Middleware to authenticate and authorize the request
 */
router.get(
  "/protected",
  authenticate,
  authorize(true), // Assuming "true" represents admin privileges
  (req, res) => {
    res.send({ message: "This is a protected route" });
  }
);

module.exports = router;
