"use strict";

var path = require('path');

const fs = require('fs'),
      userPath = path.join(__dirname, "..", "data", "users.json");

const createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

var data = fs.readFileSync(userPath),
    users = JSON.parse(data);

// Creates the newUser Object
const createUser = function(name, musicPreferences, cocktailPreferences, id) {
    return {
        name: name,
        musicPreferences: musicPreferences,
        cocktailPreferences: cocktailPreferences,
        id: id
    };
}

const postUser = function(req, res) {

    const body = req.body;

    if (body.id || body.ID || body.Id) {
        const error = createErrorObject({ status: 403, title: "Forbidden", source: {parameter: "id"} });
        return res.status(403).send(error);
    }

    const newUser = createUser(body.name, body.musicPreferences, body.cocktailPreferences, Date.now());

    users.push(newUser);

    fs.writeFile(userPath, JSON.stringify(users, null, 4), "utf8", (err) => {

        if (err) {
            const error = createErrorObject({ status: 500, title: err.message });
            return res.status(500).send(error);
        }

        users = JSON.parse(fs.readFileSync(userPath, "utf8"));

        console.log(`Added ${newUser.name} to the database.`);

        const location = req.protocol + '://' + req.get('host') + req.originalUrl;

        return res.status(201)
            .set("Location", `${location}/${newUser.id}`) //The location Headers value is the absolute URI of the created User Object
            .json({data: newUser});
    });    
}

module.exports = postUser;