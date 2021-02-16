"use strict";

const path = require('path');

const getUserById = require(path.join(__dirname, "..", "modules", "getUserById.js"));

const getUser = function(req, res) {

    res.send({data: req.users});

}

module.exports = getUser;