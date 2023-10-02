const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const routes = require("./routes/router");

const app = express();
db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

module.exports = app;
