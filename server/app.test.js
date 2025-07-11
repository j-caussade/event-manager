const request = require("supertest");
const app = require("./app");

// Setting a timeout for the server to start
jest.setTimeout(30000);

describe("GET /", () => {
  let server;

  // Before all tests, start the server
  beforeAll((done) => {
    server = app.listen(3000, () => {
      done();
    });
  });

  // After all the tests, close the server
  afterAll((done) => {
    server.close(done);
  });

  it("responds with a welcome message", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /text\/html/);

    expect(response.text).toBe("Adishatz moùnde !"); // Check the response text
  });
});
