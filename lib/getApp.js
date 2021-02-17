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

//User Routes
app.get("/users/:id?", getUserMidd, paginateUser, limitUser, routes.getUser);
app.delete("/users/:id", routes.deleteUser);
app.patch("/users/:id", routes.patchUser); 
app.post("/users", userParamCheck, routes.postUser);

//Combination Routes
app.get("/combination/track/:userId?", (req, res) => {res.send("Hier kommt der Track Combination Pfad hin")}/* routes.getCombinationTrack */);
app.get("/combination/playlist/:userId?", (req, res) => {res.send("Hier kommt der Playlist Combination Pfad hin")}/* routes.getCombinationPlaylist */);

module.exports = app;