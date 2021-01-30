"use strict";

const generateUrl = function(properties, callback) {
    if (!properties) {
        return callback(new Error("Properties are missing"));
    }
    if (!callback) {
        throw new Error("Hallihallo is missing");
    }

    if (properties.length === 0) {
        return callback(null, "");
    }
    
    let url = ""

    for (const property of properties) {

        if (!property["name"]) {
            return callback(new Error("Name of the property is missing"));
        }
        if (!property["value"]) {
            return callback(new Error("Value of the property is missing"));
        }

        let suffix = `${property["name"]}=${property["value"]}`;
        url += suffix;
    };

    return callback(null, url);
};

module.exports = generateUrl;