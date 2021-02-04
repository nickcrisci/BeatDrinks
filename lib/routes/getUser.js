"use strict";

const path = require('path');

const getUserById = require(path.join(__dirname, "..", "modules", "getUserById.js"));

const getUser = function(req, res) {

    getUserById(req.params.id, (err, user) => {
        if (err) {
            return res.status(422).send(err.message);
        }

        console.log(JSON.stringify(user));

        return res.send(user);
    })
}

module.exports = getUser;