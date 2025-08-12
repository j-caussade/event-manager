// Import the Express module
const express = require("express");

// Create a new router object to handle routes
const router = express.Router();

// Import the user controller which contains the logic for handling user-related requests
const userController = require("../controllers/userController");

// Import the authentication and authorization middleware
const { authenticate, authorize } = require("../middlewares/authMiddleware");

/**
 * Route to create a new user.
 *
 * This route handles POST requests to create a new user.
 * It uses the createUser function from the userController to process the request.
 */
router.post("/", userController.createUser);

/**
 * Route to get all users.
 *
 * This route handles GET requests to retrieve all users.
 * It uses the getAllUsers function from the userController to process the request.
 */
router.get("/", authenticate, authorize(1), userController.getAllUsers);

/**
 * Route to get a specific user by ID.
 *
 * This route handles GET requests to retrieve a specific user by its ID.
 * It uses the getUserById function from the userController to process the request.
 */
router.get("/:id", authenticate, userController.getUserById);

/**
 * Route to update an existing user.
 *
 * This route handles PUT requests to update an existing user by its ID.
 * It uses the updateUser function from the userController to process the request.
 */
router.put("/:id", authenticate, userController.updateUser);

/**
 * Route to delete a user.
 *
 * This route handles DELETE requests to remove a user by its ID.
 * It uses the deleteUser function from the userController to process the request.
 */
router.delete("/:id", authenticate, authorize(1), userController.deleteUser);

// Export the router to be used in other parts of the application
module.exports = router;
