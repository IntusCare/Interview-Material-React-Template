const express = require("express");
const cors = require('cors');
const { participants } = require("./data");

const app = express();

// Enable CORS for all routes to allow requests from https://localhost:3000 only
app.use(cors({ origin: 'http://localhost:3000' }));

app.get("/participants", (_, res) => {
  res.json(participants);
});

module.exports = { app };
