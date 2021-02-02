"use strict";

var path = require('path');

const fs = require('fs'),
    userPath = path.join(__dirname, "..", "users.json");

var data = fs.readFileSync(userPath),
    users = JSON.parse(data),
    nextId = null;

const postUser = function(req, res) {

    if(!nextId) {
        nextId = users.length + 1;
    }

    const body = req.body;

    const newUser = {
        name: body.name,
        preferences: body.preferences,
        id: nextId
    }; 

    users.push(newUser);

    fs.writeFile(userPath, JSON.stringify(users), "utf8", (err) => {

        if(err) {
            res.status(500).send(err.message);
        }

        nextId++;

        users = JSON.parse(fs.readFileSync(userPath, "utf8"));

        console.log(`Added ${newUser.name} to the database.`);

    }); 

    res.status(201).send("User Created");
}

module.exports = postUser;