"use strict";

const bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path");

const routes = require(path.join(__dirname, "routes"));

const userParamCheck = require(path.join(__dirname, "middleware", "userParamCheck"));

const app = express();

app.use(bodyParser.json());

//app.get("/playlist", routes.getPlaylist);

app.get("/user/:id", routes.getUser);
app.delete("/user/:id", routes.deleteUser);
app.post("/user", userParamCheck, routes.postUser);

module.exports = app;