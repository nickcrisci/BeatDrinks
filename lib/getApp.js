"use strict";

const bodyParser = require("body-parser"),
    express = require("express");

const routes = require("./routes");

const app = express();

app.use(bodyParser.json());

app.get("/", routes.getHello)

module.exports = app;