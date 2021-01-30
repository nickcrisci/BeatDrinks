"use strict";

const generateUrl = require("../modules/urlGenerator")

const getHello = function (req, res) {
    generateUrl([{name : "Apfel", value : 1.0}], (err, url) => {
        if (err) {
            return console.log(err.message);
        }
        res.send(url)
    });
};

module.exports = getHello;