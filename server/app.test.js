const request = require("supertest");
const app = require("./app");

describe("GET /", () => {
  it("responds with a welcome message", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.text).toBe("Adishatz moùnde !");
  });
});
