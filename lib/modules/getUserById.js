"use strict";

const path = require("path"),
    fs = require("fs");

const getUserById = function(id, callback) {

    if(!id) {
        return callback(new Error("Id is missing."), null);
    }
    if(!callback) {
        throw new Error("Callback is missing");
    }

    const userPath = path.join(__dirname, "..", "data", "users.json");

    fs.readFile(userPath, "utf8", (err, data) => {

        if (err) {
            return callback(err, null);
        }
        
        const users = JSON.parse(data);
        const user = users[id - 1];

        if (!user) {
            return callback(new Error("User not found."), null)
        }

        return callback(null, user);
    })
}

module.exports = getUserById; 