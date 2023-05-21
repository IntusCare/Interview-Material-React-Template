const express = require("express");
const { participants } = require("./data");

const app = express();
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //I added this line so the get request can be accessed locally, change the port number for react-app as needed or use *
  next();
});
app.get("/participants", (_, res) => {
  res.json(participants);
});

module.exports = { app };
