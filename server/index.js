const express = require("express");
const port = process.env.PORT || 8000;

const db = require("./config/mongoose");
const Contact = require("./model/contact");
const app = express;

app.use(express.urlencoded());

app.listen(port, function (err) {
  if (err) {
    console.log("error running in the server", err);
  }
  console.log("my express server running on port ", port);
});
