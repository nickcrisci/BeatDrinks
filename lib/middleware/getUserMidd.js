"use strict";

const path = require("path"),
    fs = require("fs"),
    userPath = path.join(__dirname, "..", "data", "users.json");

const getUserById = require(path.join(__dirname, "..", "modules", "getUserById")),
    createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

const getUserMidd = function(req, res, next) {

    //Checks for unknown query parameters
    for (const query in req.query) {
        if(query != "limit" && query != "page") {
            const error = createErrorObject({ status: 400, title: "Bad Request", source: { parameter: query } });
            return res.status(400).send(error);
        }
    }

    const id = req.params.id || null;

    if (id) {
        getUserById(id, (err, user) => {
            if(err) {
                if(err.message === "User not found") {
                    const error = createErrorObject({ status: 404, title: "User not found", source: { parameter: "id" } });
                    return res.status(404).send(error);
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