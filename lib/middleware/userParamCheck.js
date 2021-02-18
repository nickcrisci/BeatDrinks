"use strict"

const userParamCheck = function (req, res, next) {

    const body = req.body;

    if (!body.name) {
        return res.status(400).send("Name missing.");
    }

    next();
}

module.exports = userParamCheck;