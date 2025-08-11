// Import the supertest module for testing HTTP endpoints
const request = require("supertest");

// Import the Express application from the app.js file
const app = require("./app");

/**
 * Test suite for the GET / endpoint.
 *
 * This suite contains tests that verify the behavior of the root endpoint.
 */
describe("GET /", () => {
  /**
   * Test case: it should respond with a welcome message.
   *
   * This test sends a GET request to the root endpoint and checks if the response
   * contains the expected welcome message.
   */
  it("responds with a welcome message", async () => {
    // Send a GET request to the root endpoint and expect a 200 status code
    const response = await request(app).get("/").expect(200);

    // Assert that the response text matches the expected welcome message
    expect(response.text).toBe("Adishatz moùnde !");
  });
});
