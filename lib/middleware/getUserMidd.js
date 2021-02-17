"use strict";

const path = require("path"),
    fs = require("fs"),
    userPath = path.join(__dirname, "..", "data", "users.json");

const getUserById = require(path.join(__dirname, "..", "modules", "getUserById"));

const getUserMidd = function(req, res, next) {

    //Checks for unknown query parameters
    for (const query in req.query) {
        if(query != "limit" && query != "page") {
            res.status(400).send("Bad Request");
        }
    }

    const id = req.params.id || null;

    if (id) {
        getUserById(id, (err, user) => {
            if(err) {
                if(err.message === "User not found") {
                    res.status(404).send("User not found.");
                }
            }

            req.users = user || [];
            return next();
        });
    } else {
        fs.readFile(userPath, "utf8", (err, data) => {

            if(err) {
                res.send(err.message);
            }
    
            req.users = JSON.parse(data);
            return next();
        });
    }
}


module.exports = getUserMidd; 