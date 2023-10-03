const express = require("express");
const db = require("./db");
const routes = require("./routes/router");

const app = express();
db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

module.exports = app;
