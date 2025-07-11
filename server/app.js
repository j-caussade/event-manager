require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  res.send("Adishatz moùnde !");
});

app.listen(port, hostname, () => {
  console.log(`App runing at http://${hostname}:${port}`);
});
