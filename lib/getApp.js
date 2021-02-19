"use strict";

const bodyParser = require("body-parser"),
      express = require("express"),
      path = require("path");

const routes = require(path.join(__dirname, "routes"));

const middleWarePath = path.join(__dirname, "middleware");

// Middleware for User Paths
const userParamCheck = require(path.join(middleWarePath, "userParamCheck")),
      getUserMidd = require(path.join(middleWarePath, "getUserMidd")),
      limitUser = require(path.join(middleWarePath, "limitUser")),
      paginateUser = require(path.join(middleWarePath, "paginateUser"));

const getCombination = require(path.join(middleWarePath, "getCombination")),
      cocktailFilter = require(path.join(middleWarePath, "cocktailFilter"));

const app = express();

app.use(bodyParser.json());

// User Routes
app.get("/users/:id?", getUserMidd, paginateUser, limitUser, routes.getUser);
app.delete("/users/:id", routes.deleteUser);
app.patch("/users/:id", routes.patchUser); 
app.post("/users", userParamCheck, routes.postUser);

// Combination Routes
app.get("/combination/track/:userId?", getCombination, cocktailFilter, routes.getTrackCombination);
app.get("/combination/playlist/:userId?", getCombination, cocktailFilter, routes.getTrackCombination);

module.exports = app;