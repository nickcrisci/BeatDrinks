"use strict";

const getUserById = require("../modules/getUserById");

const getCombination = function(req, res, next) {

    const userId = req.params.userId;
    const market = req.query.market;
    const limit = req.query.limit;
}

module.exports = getCombination;