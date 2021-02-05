"use strict";

const bodyParser = require("body-parser"),
    express = require("express");

const routes = require("./routes");

const userParamCheck = require("./middleware/userParamCheck");

const app = express();

app.use(bodyParser.json());

app.get("/", routes.example);

app.get("/playlist", routes.getPlaylist);

app.get("/user/:id", routes.getUser);
app.delete("/user/:id", routes.deleteUser);
app.post("/user", userParamCheck, routes.postUser);

module.exports = app;