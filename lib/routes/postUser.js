"use strict";

var path = require('path');

const fs = require('fs'),
    userPath = path.join(__dirname, "..", "data", "users.json");

var data = fs.readFileSync(userPath),
    users = JSON.parse(data);

const postUser = function(req, res) {

    const body = req.body;

    const newUser = {
        name: body.name,
        preferences: body.preferences,
        id: Date.now()
    }; 

    users.push(newUser);

    fs.writeFile(userPath, JSON.stringify(users, null, 4), "utf8", (err) => {

        if(err) {
            return res.status(500).send(err.message);
        }

        users = JSON.parse(fs.readFileSync(userPath, "utf8"));

        console.log(`Added ${newUser.name} to the database.`);

        return res.status(201).send(`User ${newUser.name} created with ID: ${newUser.id}`);
    });    
}

module.exports = postUser;