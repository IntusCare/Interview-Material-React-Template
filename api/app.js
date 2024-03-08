const express = require("express");
const { participants } = require("./data");

const app = express();

app.get("/participants", (_, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(participants);
});

module.exports = { app };
