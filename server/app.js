require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT;
const hostname = process.env.HOST;

app.get("/", (req, res) => {
  res.send("Adishatz moùnde !");
});

app.listen(port, hostname, () => {
  console.log(`App runing at http://${hostname}:${port}`);
});
