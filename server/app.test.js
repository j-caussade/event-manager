// Import the supertest module for testing HTTP endpoints
const request = require("supertest");

// Import the Express application from the app.js file
const app = require("./app");

// Define a test suite for the GET / endpoint
describe("GET /", () => {
  // Define a test case: it should respond with a welcome message
  it("responds with a welcome message", async () => {
    // Send a GET request to the root endpoint and expect a 200 status code
    const response = await request(app).get("/").expect(200);

    // Assert that the response text is the expected welcome message
    expect(response.text).toBe("Adishatz moùnde !");
  });
});
