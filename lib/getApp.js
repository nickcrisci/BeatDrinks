"use strict";

const bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path");

const routes = require(path.join(__dirname, "routes"));

const userParamCheck = require(path.join(__dirname, "middleware", "userParamCheck")),
    getUserMidd = require(path.join(__dirname, "middleware", "getUserMidd")),
    limitUser = require(path.join(__dirname, "middleware", "limitUser"));

const app = express();

app.use(bodyParser.json());

app.get("/users/:id?", getUserMidd, limitUser, routes.getUser);
app.delete("/users/:id", routes.deleteUser);
app.post("/users", userParamCheck, routes.postUser);

module.exports = app;