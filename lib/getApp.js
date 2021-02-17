"use strict";

const bodyParser = require("body-parser"),
    express = require("express"),
    path = require("path");

const routes = require(path.join(__dirname, "routes"));

const middleWarePath = path.join(__dirname, "middleware");

//Middleware for User Paths
const userParamCheck = require(path.join(middleWarePath, "userParamCheck")),
    getUserMidd = require(path.join(middleWarePath, "getUserMidd")),
    limitUser = require(path.join(middleWarePath, "limitUser")),
    paginateUser = require(path.join(middleWarePath, "paginateUser"));

const app = express();

app.use(bodyParser.json());

app.get("/users/:id?", getUserMidd, paginateUser, limitUser, routes.getUser);
app.delete("/users/:id", routes.deleteUser);
app.patch("/users/:id", routes.patchUser); 
app.post("/users", userParamCheck, routes.postUser);


module.exports = app;