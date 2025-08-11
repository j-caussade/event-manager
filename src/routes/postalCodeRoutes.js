// Import the Express module
const express = require("express");
// Create a new router object to handle routes
const router = express.Router();
// Import the postalCode controller which contains the logic for handling postal code-related requests
const postalCodeController = require("../controllers/postalCodeController");

/**
 * Route to create a new postal code.
 *
 * This route handles POST requests to create a new postal code.
 * It uses the createPostalCode function from the postalCodeController to process the request.
 */
router.post("/", postalCodeController.createPostalCode);

/**
 * Route to get all postal codes.
 *
 * This route handles GET requests to retrieve all postal codes.
 * It uses the getAllPostalCodes function from the postalCodeController to process the request.
 */
router.get("/", postalCodeController.getAllPostalCodes);

/**
 * Route to get a specific postal code by ID.
 *
 * This route handles GET requests to retrieve a specific postal code by its ID.
 * It uses the getPostalCodeById function from the postalCodeController to process the request.
 */
router.get("/:id", postalCodeController.getPostalCodeById);

/**
 * Route to update an existing postal code.
 *
 * This route handles PUT requests to update an existing postal code by its ID.
 * It uses the updatePostalCode function from the postalCodeController to process the request.
 */
router.put("/:id", postalCodeController.updatePostalCode);

/**
 * Route to delete a postal code.
 *
 * This route handles DELETE requests to remove a postal code by its ID.
 * It uses the deletePostalCode function from the postalCodeController to process the request.
 */
router.delete("/:id", postalCodeController.deletePostalCode);

// Export the router to be used in other parts of the application
module.exports = router;
