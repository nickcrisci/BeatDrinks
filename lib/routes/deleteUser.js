"use strict";

const path = require('path'),
    fs = require('fs')

const userPath = path.join(__dirname, "..", "data", "users.json");

const deleteUser = function(req, res) {

    const id = req.params.id;

    fs.readFile(userPath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).send(err.message);
        }

        const users = JSON.parse(data);

        //Iterating backwards because splice changes the index
        for (let i = users.length - 1; i >= 0; i--) {
            if (users[i].id == id) {
                users.splice(i, 1);
                return fs.writeFile(userPath, JSON.stringify(users, null, 4), "utf8", () => {
                    res.status(200).send(`Deleted User with the ID: ${id}`);
                })
            } 
        }

        res.status(404).send("User not found.");
        
    })

}

module.exports = deleteUser;