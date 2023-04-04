const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("../app.js");

app.use(express.json());


app.listen(process.env.
  PORT || 3900, () => {
  console.log("APP IS LISTENING ON PORT " + 3900);
});
