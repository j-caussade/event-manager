require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  res.send("2025/07/19: Adishatz moùnde !");
});

// Export the application for testing
module.exports = app;

// Only start the server if this file is executed directly
if (require.main === module) {
  app.listen(port, hostname, () => {
    console.log(`App running at http://${hostname}:${port}`);
  });
}
